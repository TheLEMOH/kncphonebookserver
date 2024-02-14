const Router = require('express')
const router = new Router()
const controller = require('../services/division')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/divisions', authMiddleware, controller.create)
router.get('/divisions', controller.get)
router.get('/divisions/pages', controller.getPages)
router.get('/divisions/:id', authMiddleware, controller.getOne)
router.put('/divisions/:id', authMiddleware, controller.update)
router.delete('/divisions/:id', authMiddleware, controller.delete)

module.exports = router