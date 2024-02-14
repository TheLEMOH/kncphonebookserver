const { limit } = require('../config')
const Model = require('../models/organization')
const Subdivision = require('../models/subdivision')
const Division = require("../models/division")

const CreateFilter = require("../scripts/createfilters")
const Offset = require('../scripts/offset')

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
            const offset = Offset(req)
            const filter = CreateFilter(req.query)
            const items = await Model.findAndCountAll({ where: filter, order: ['shortName'], offset: offset, limit: limit },)
            res.json(items)
        }
        catch (err) {
            next(err)
        }
    }

    async get(req, res, next) {
        try {
            const filter = CreateFilter(req.query)
            const items = await Model.findAll({ where: filter, order: ['shortName'] })
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

    async getStructure(req, res, next) {
        try {
            const { level } = req.query

            const filter = CreateFilter(req.query)
            
            let items = []

            if (level == 1)
                items = await Model.findAll({
                    where: filter,
                    order: ['shortName'],
                    include: [{ model: Division, order: ['name'] }]
                })

            if (level == 2)
                items = await Model.findAll({
                    where: filter,
                    order: ['shortName'],
                    include: [{ model: Division, order: ['name'], include: [{ model: Subdivision, order: ['name'], }] }]
                })
            res.json(items)
        } catch (err) {
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

module.exports = new Controller()