const { limit } = require('../config')

const Model = require('../models/subdivision')
const Division = require('../models/division')
const Organization = require('../models/organization')

const CreateFilter = require("../scripts/createfilters")

const Offset = require('../scripts/offset')


class Service {
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
            const offset = Offset(req)
            const filter = CreateFilter(req.query)

            const subDivisionFilter = filter.name ? { name: filter.name } : null
            const organizationFilter = filter.organization ? { name: filter.organization } : null
            const divisionFilter = filter.division ? { name: filter.division } : null

            const items = await Model.findAndCountAll({
                where: subDivisionFilter,
                offset: offset,
                limit: limit,
                order: ['name'],
                include: [{
                    where: divisionFilter, model: Division, attributes: ['id', 'name']
                }, {
                    where: organizationFilter, model: Organization, attributes: ['id', 'shortName']
                }]
            })
            res.json(items)
        }
        catch (err) {
            next(err)
        }

    }

    async get(req, res, next) {
        try {
            const items = await Model.findAll({ include: [{ model: Division, attributes: ['id', 'name'] }] })
            res.json(items)
        }
        catch (err) {
            next(err)
        }

    }

    async getByOrg(req, res, next) {
        try {
            const query = req.query
            const organizationId = query.organization
            const items = await Model.findAll({ include: [{ model: Division, attributes: ['id', 'name'] }], where: { organizationId } })
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
            const items = await Model.update(req.body, { where: { id: id } })
            res.json(items)
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

module.exports = new Service()