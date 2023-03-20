const Router = require("express");
const router = new Router();
const controller = require("../controllers/employee");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/employees", authMiddleware, controller.create);
router.post("/employees/bulkcreate", authMiddleware, controller.createbulk);
router.get("/employees", controller.get);
router.get("/employees/pages", controller.getPages);
router.get("/employees/pages/group", controller.getPagesGroup);
router.get("/employees/:id", authMiddleware, controller.getOne);
router.put("/employees/:id", authMiddleware, controller.update);
router.delete("/employees/:id", authMiddleware, controller.delete);

module.exports = router;
