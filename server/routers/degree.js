const Router = require('express')
const router = new Router()
const controller = require('../controllers/degree')

router.get('/degrees', controller.get)

module.exports = router