const Router = require('express')
const router = new Router()
const service = require('../services/individual')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/individuals', authMiddleware, service.create)
router.get('/individuals', service.get)
router.get('/individuals/pages', service.getPages)
router.get('/individuals/:id', authMiddleware, service.getOne)
router.put('/individuals/:id', authMiddleware, service.update)
router.delete('/individuals/:id', authMiddleware, service.delete)

module.exports = router