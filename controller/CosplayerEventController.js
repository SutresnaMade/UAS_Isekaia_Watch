const db = require("knex")(require("../knexfile").development);
const path = require("path");
const fs = require("fs").promises;

class CosplayerEventController {
  static async index(req, res) {

  const cosplayer = await db("tb_cosplayer");
  const event = await db("tb_event")

  const eventCosplayer  = await db("tb_eventcosplayer")
    .innerJoin("tb_event", "tb_event.id", "tb_eventcosplayer.id_event")
    .innerJoin("tb_cosplayer", "tb_cosplayer.id", "tb_eventcosplayer.id_cosplayer")
    .select(
      "tb_eventcosplayer.id_eventcosplayer",
      "tb_cosplayer.nama_cosplayer",
      "tb_cosplayer.nama_karakter",
      "tb_event.nama_event"
    );

    res.render("pages/dashboard/cosplayerEvent/list", {
    eventCosplayer: eventCosplayer,
    cosplayer: cosplayer,
    event: event,

    });
  }

  static async store(req, res) {
    const {namaCosplayer, namaEvent} =
      req.body;

    try {
      const result = await db("tb_eventcosplayer").insert({
        id_cosplayer: namaCosplayer,
        id_event: namaEvent,
      });

      if (result) {
        req.flash("success", "Success Save Data Cosplayer");
        res.redirect("/cosplayer-event/list");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(req, res) {
    const { id } = req.body;

    try {
      // Delete the eventcosplayer record from the database
      await db("tb_eventcosplayer").where({ id_eventcosplayer: id }).del();

      res.redirect("/cosplayer-event/list"); // No content (successful deletion)
    } catch (error) {
      console.error("Error deleting event:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = CosplayerEventController;
