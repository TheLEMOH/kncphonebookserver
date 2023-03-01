const Router = require("express");
const router = new Router();
const controller = require("../controllers/position");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/positions", authMiddleware, controller.create);
router.get("/positions", controller.get);
router.get("/positions/pages", controller.getPages);
router.get("/positions/:id", authMiddleware, controller.getOne);
router.put("/positions/:id", authMiddleware, controller.update);
router.delete("/positions/:id", authMiddleware, controller.delete);

module.exports = router;
