const Router = require("express");
const router = new Router();
const service = require("../services/position");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/positions", authMiddleware, service.create);
router.get("/positions", service.get);
router.get("/positions/pages", service.getPages);
router.get("/positions/:id", authMiddleware, service.getOne);
router.put("/positions/:id", authMiddleware, service.update);
router.delete("/positions/:id", authMiddleware, service.delete);

module.exports = router;
