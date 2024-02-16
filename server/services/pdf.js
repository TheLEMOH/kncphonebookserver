const Organization = require("../models/organization")
const Subdivision = require('../models/subdivision')
const Division = require("../models/division")
const Employee = require("../models/employee")

class Service {
    async get(req, res, next) {
        try {
            const id = req.params.id
            const items = await Organization.findAll({
                where: { id },
                include: [{ model: Division, include: [{ model: Subdivision, include: [{ model: Employee }] }] }]
            })
            res.json(items)
        }
        catch (err) {
            next(err)
        }

    }

}

module.exports = new Service()



try {
}
catch (err) {
    next(err)
}