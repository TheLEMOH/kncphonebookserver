const Router = require('express')
const router = new Router()
const controller = require('../services/subdivision')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/subdivisions', authMiddleware, controller.create)
router.get('/subdivisions', controller.get)
router.get('/subdivisions/pages', controller.getPages)
router.get('/subdivisions/byorg', controller.getByOrg)
router.get('/subdivisions/:id', authMiddleware, controller.getOne)
router.put('/subdivisions/:id', authMiddleware, controller.update)
router.delete('/subdivisions/:id', authMiddleware, controller.delete)

module.exports = router