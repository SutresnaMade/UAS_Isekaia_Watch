const db = require("knex")(require("../knexfile").development);
const path = require("path");
const fs = require("fs").promises;

class SearchController {
  static async cosplayer(req, res) {
    const { search } = req.query;

    const data = await db("tb_cosplayer").whereLike(
      "nama_cosplayer",
      "%" + search + "%"
    );
    res.render("pages/dashboard/cosplayer/list", {
      cosplayers: data,
    });
  }

  static async event(req, res) {
    const { search } = req.query;

    const data = await db("tb_event").whereLike(
      "nama_event",
      "%" + search + "%"
    );
    res.render("pages/dashboard/event/list", {
      events: data,
    });
  }

  static async dashboard(req, res) {
    const { search } = req.query;

    const data = await db("tb_event").whereLike(
      "nama_event",
      "%" + search + "%"
    );
    res.render("pages/dashboard/index", {
      data: data,
    });
  }

  static async eventcosplayer(req, res) {
    const { search } = req.query;
    const cosplayers = await db("tb_cosplayer");
    const events = await db("tb_event");
    const data = await db("tb_eventcosplayer")
      .innerJoin("tb_event", "tb_event.id", "tb_eventcosplayer.id_event")
      .innerJoin(
        "tb_cosplayer",
        "tb_cosplayer.id",
        "tb_eventcosplayer.id_eventcosplayer"
      )
      .select(
        "tb_eventcosplayer.id_eventcosplayer",
        "tb_cosplayer.nama_cosplayer",
        "tb_cosplayer.nama_karakter",
        "tb_event.nama_event"
      )
      .whereLike("nama_cosplayer", "%" + search + "%");
    res.render("pages/dashboard/cosplayerEvent/list", {
      eventCosplayer: data,
      cosplayer: cosplayers,
      event: events,
    });
  }

}

module.exports = SearchController;
