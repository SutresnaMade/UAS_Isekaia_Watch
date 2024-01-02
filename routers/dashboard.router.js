const { Router } = require("express");
const EventController = require("../controller/EventController");
const CosplayerController = require("../controller/CosplayerController");
const CosplayerEventController = require("../controller/CosplayerEventController");

const SearchController = require("../controller/SearchController");
const db = require("knex")(require("../knexfile").development);
const router = Router();

router.get("/", EventController.all);

// event router
router.get("/event/list", EventController.index);
router.post("/event/store", EventController.store);
router.get("/event/:id", EventController.edit);
router.post("/event/update/:id",  EventController.update);
router.post("/event/delete", EventController.delete);

// cosplayer router
router.get("/cosplayer/list", CosplayerController.index);
router.post("/cosplayer/store", CosplayerController.store);
router.get("/cosplayer/:id", CosplayerController.edit);
router.post("/cosplayer/update/:id",  CosplayerController.update);
router.post("/cosplayer/delete", CosplayerController.delete);

// event cosplayer

// event list event cosplayer
router.get("/cosplayer-event/list", CosplayerEventController.index);
router.post("/cosplayer-event/store", CosplayerEventController.store);
router.post("/cosplayer-event/delete", CosplayerEventController.delete);


// search 

router.get("/search/cosplayer", SearchController.cosplayer);
router.get("/search/event", SearchController.event);
router.get("/search/dashboard", SearchController.dashboard);
router.get("/search/eventcosplayer", SearchController.eventcosplayer);
module.exports = router;
