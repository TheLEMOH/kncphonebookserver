const Router = require("express");
const router = new Router();
const service = require("../services/rooms");

router.get("/rooms", service.getByLevel);

module.exports = router;
