const Model = require('../models/degree')

class Service {
    async get(req, res) {
        const items = await Model.findAll()
        res.json(items)
    }
}

module.exports = new Service()