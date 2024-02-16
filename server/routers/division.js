const Router = require('express')
const router = new Router()
const service = require('../services/division')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/divisions', authMiddleware, service.create)
router.get('/divisions', service.get)
router.get('/divisions/pages', service.getPages)
router.get('/divisions/:id', authMiddleware, service.getOne)
router.put('/divisions/:id', authMiddleware, service.update)
router.delete('/divisions/:id', authMiddleware, service.delete)

module.exports = router