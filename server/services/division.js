const Model = require('../models/division')

const OrganizationModel = require('../models/organization')
const SubdivisionModel = require('../models/subdivision')

const CreateFilter = require("../scripts/createfilters")

class Controller {
    async create(req, res, next) {
        try {
            await Model.create(req.body)
            res.json(true)
        }
        catch (err) {
            next(err)
        }
    }

    async getPages(req, res, next) {
        try {
            const filter = CreateFilter(req.query)
            const divisionFilter = filter.name ? { name: filter.name } : null
            const organizationFilter = filter.organization ? { name: filter.organization } : null
            const items = await Model.findAndCountAll({ where: divisionFilter, include: [{ where: organizationFilter, model: OrganizationModel, attributes: ['id', 'name', 'shortName'] }], })
            res.json(items)
        }
        catch (err) {
            next(err)
        }
    }

    async get(req, res, next) {
        try {
            const items = await Model.findAll({ include: [{ model: OrganizationModel, attributes: ['id', 'name', 'shortName'], }], })
            res.json(items)
        }
        catch (err) {
            next(err)
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id
            const item = await Model.findOne({ where: { id: id } })
            res.json(item)
        }
        catch (err) {
            next(err)
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id
            const organizationId = req.body.organizationId
            const division = await Model.update(req.body, { where: { id: id } })
            const subdivision = await SubdivisionModel.update({ organizationId }, { where: { divisionId: id } })

            res.json(true)
        }
        catch (err) {
            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id
            const items = await Model.destroy({ where: { id: id } })
            res.json(items)
        }
        catch (err) {
            next(err)
        }
    }

}

module.exports = new Controller()