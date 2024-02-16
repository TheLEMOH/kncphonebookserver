const Router = require('express')
const router = new Router()
const service = require('../services/organization')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/organizations', authMiddleware, service.create)
router.get('/organizations', service.get)
router.get('/organizations/pages', service.getPages)
router.get('/organizations/:id', authMiddleware, service.getOne)
router.put('/organizations/:id', authMiddleware, service.update)
router.delete('/organizations/:id', authMiddleware, service.delete)

router.get('/structure', service.getStructure)

module.exports = router