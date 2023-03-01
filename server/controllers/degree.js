const Model = require('../models/degree')

class Controller {
    async get(req, res) {
        const items = await Model.findAll()
        res.json(items)
    }
}

module.exports = new Controller()