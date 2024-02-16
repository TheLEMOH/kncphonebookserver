const Router = require('express')
const router = new Router()
const service = require('../services/pdf')
const authMiddleware = require('../middleware/authMiddleware')
router.get('/forpdf/:id', authMiddleware, service.get)


module.exports = router