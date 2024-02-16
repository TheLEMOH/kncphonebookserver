const Router = require('express')
const router = new Router()
const service = require('../services/subdivision')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/subdivisions', authMiddleware, service.create)
router.get('/subdivisions', service.get)
router.get('/subdivisions/pages', service.getPages)
router.get('/subdivisions/byorg', service.getByOrg)
router.get('/subdivisions/:id', authMiddleware, service.getOne)
router.put('/subdivisions/:id', authMiddleware, service.update)
router.delete('/subdivisions/:id', authMiddleware, service.delete)

module.exports = router