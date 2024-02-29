const Router = require('express')
const router = new Router()
const service = require('../services/employment')

router.get('/employments', service.get)

module.exports = router