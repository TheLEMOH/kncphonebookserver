const Router = require('express')
const router = new Router()
const service = require('../services/user')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/registration', authMiddleware, service.create)
router.get('/login', service.login)
router.get('/refresh', service.refresh)
router.get('/users/pages', authMiddleware, service.getPages)
router.get('/users', authMiddleware, service.get)
router.get('/users/:id', authMiddleware, service.getOne)
router.put('/users/:id', authMiddleware, service.update)
router.put('/changepassword/:id', authMiddleware, service.password)
router.delete('/users/:id', authMiddleware, service.delete)
module.exports = router