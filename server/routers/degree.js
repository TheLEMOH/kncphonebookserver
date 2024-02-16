const Router = require('express')
const router = new Router()
const service = require('../services/degree')

router.get('/degrees', service.get)

module.exports = router