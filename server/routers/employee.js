const Router = require("express");
const router = new Router();
const service = require("../services/employee");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/employees", authMiddleware, service.create);
router.post("/employees/bulkcreate", authMiddleware, service.createbulk);
router.get("/employees", service.get);
router.get("/employees/pages", service.getPages);
router.get("/employees/pages/group", service.getPagesGroup);
router.get("/employees/:id", authMiddleware, service.getOne);
router.get("/empsub/:id", service.getByIdSubdivision);
router.put("/employees/:id", authMiddleware, service.update);
router.delete("/employees/:id", authMiddleware, service.delete);

module.exports = router;
