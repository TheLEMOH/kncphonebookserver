const Router = require('express')
const router = new Router()
const controller = require('../controllers/organization')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/organizations', authMiddleware, controller.create)
router.get('/organizations', controller.get)
router.get('/organizations/pages', controller.getPages)
router.get('/organizations/:id', authMiddleware, controller.getOne)
router.put('/organizations/:id', authMiddleware, controller.update)
router.delete('/organizations/:id', authMiddleware, controller.delete)

router.get('/structure', controller.getStructure)

module.exports = router