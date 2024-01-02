const { Router } = require("express");

const router = Router();

const dashboardRouter = require("./dashboard.router");

router.use(dashboardRouter);

module.exports = router;
