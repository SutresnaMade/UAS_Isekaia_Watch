const db = require("knex")(require("../knexfile").development);
const path = require("path");
const fs = require("fs").promises;

class CosplayerController {
  static async index(req, res) {
    const data = await db("tb_cosplayer");

    res.render("pages/dashboard/cosplayer/list", {
      page_name: "cosplayerList",
      cosplayers: data,
    });
  }

  static async edit(req, res) {
    const { id } = req.params;

    try {
      let result = await db("tb_cosplayer").where("id", id).first();
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }

  static async store(req, res) {
    const { namaCosplayer, namaKarakter, namaAnime } =
      req.body;

    try {
      const result = await db("tb_cosplayer").insert({
        nama_cosplayer: namaCosplayer,
        nama_karakter: namaKarakter,
        nama_anime: namaAnime,
      });

      if (result) {
        req.flash("success", "Success Save Data Cosplayer");
        res.redirect("/cosplayer/list");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async update(req, res) {
    const { namaCosplayer, namaKarakter, namaAnime} =
      req.body;
    const { id } = req.params;

    try {

      let result = await db("tb_cosplayer")
        .where("id", id)
        .update({
        nama_cosplayer: namaCosplayer,
        nama_karakter: namaKarakter,
        nama_anime: namaAnime,
        });

      if (result) {
        req.flash("success", "Success update Data Cosplayer");
        res.redirect("/cosplayer/list");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(req, res) {
    const { id } = req.body;
    console.log();
    try {
      // Fetch the event data to get the filename
      const cosplayer = await db("tb_cosplayer").where("id", id).first();


      // Delete the event record from the database
      await db("tb_cosplayer").where({ id: id }).del();

      res.redirect("/cosplayer/list"); // No content (successful deletion)
    } catch (error) {
      console.error("Error deleting tb_cosplayer:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = CosplayerController;
