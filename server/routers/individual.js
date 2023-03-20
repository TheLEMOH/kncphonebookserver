const Router = require('express')
const router = new Router()
const controller = require('../controllers/individual')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/individuals', authMiddleware, controller.create)
router.get('/individuals', controller.get)
router.get('/individuals/pages', controller.getPages)
router.get('/individuals/:id', authMiddleware, controller.getOne)
router.put('/individuals/:id', authMiddleware, controller.update)
router.delete('/individuals/:id', authMiddleware, controller.delete)

module.exports = router