const db = require("knex")(require("../knexfile").development);
const path = require("path");
const fs = require("fs").promises;

class EventController {
  static async index(req, res) {
    const data = await db("tb_event");

    res.render("pages/dashboard/event/list", {
      page_name: "eventList",
      events: data,
    });
  }

  static async edit(req, res) {
    const { id } = req.params;

    try {
      let result = await db("tb_event").where("id", id).first();
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }

  static async store(req, res) {
    const { namaEvent, lokasiEvent, tanggal_selesai, tanggal_event } =
      req.body;

    try {
      let result = await db("tb_event").insert({
        nama_event: namaEvent,
        tgl_mulaievent: tanggal_event,
        tgl_selesaievent: tanggal_selesai,
        lokasi_event: lokasiEvent,
      });
      if (result) {
        req.flash("success", "Success Save Data Event");
        res.redirect("/event/list");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async update(req, res) {
    const { namaEvent, lokasiEvent, tanggal_selesai, tanggal_event } =
      req.body;
    const { id } = req.params;

    try {

      let result = await db("tb_event")
        .where("id", id)
        .update({
            nama_event: namaEvent,
            tgl_mulaievent: tanggal_event,
            tgl_selesaievent: tanggal_selesai,
            lokasi_event: lokasiEvent,
        });
      if (result) {
        req.flash("success", "Success update Data Event");
        res.redirect("/event/list");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(req, res) {
    const { id } = req.body;

    try {
      // Delete the event record from the database
      await db("tb_event").where({ id: id }).del();

      res.redirect("/event/list"); // No content (successful deletion)
    } catch (error) {
      console.error("Error deleting event:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async all(req, res){
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 7);

    let data =  await db("tb_event").whereBetween("tgl_mulaievent", [
      currentDate,
      endDate,
    ]);

    res.render("pages/dashboard/index", {
      data:data,
    });
  }
}

module.exports = EventController;
