const Router = require('express')
const router = new Router()
const controller = require('../controllers/pdf')
const authMiddleware = require('../middleware/authMiddleware')
router.get('/forpdf/:id', authMiddleware, controller.get)


module.exports = router