const Model = require('../models/user')
const jwt = require('jsonwebtoken')
const CreateFilter = require("../scripts/createfilters")
const bcrypt = require('bcrypt');
const salt = 3

const { secret, limit } = require('../config')

const Offset = require('../scripts/offset')

const generateAccessToken = (id) => {
    const payload = { id }
    return jwt.sign(payload, secret, { expiresIn: '8h' })
}

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
            const items = await Model.findAndCountAll({ where: filter, offset: offset, limit: limit, attributes: ['id', 'name'] })
            res.json(items)
        }
        catch (err) {
            next(err)
        }
    }

    async get(req, res, next) {
        try {
            const items = await Model.findAll({ attributes: ['id', 'name'] })
            res.json(items)
        }
        catch (err) {
            next(err)
        }

    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id
            const item = await Model.findOne({ where: { id: id }, order: ['name'], attributes: ['id', 'name'] })
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

    async password(req, res, next) {

        try {
            const id = req.params.id

            const password = req.body.password

            const hashPassword = bcrypt.hashSync(password, salt);

            const items = await Model.update({ password: hashPassword }, { where: { id: id } })

            res.json(true)
        }
        catch (err) {
            next(err)
        }

    }

    async login(req, res, next) {
        try {
            const data = req.get('Authorization')

            const buff = Buffer.from(data, 'base64').toString('utf8');

            const name = buff.split(':')[0]
            const password = buff.split(':')[1]

            const client = await Model.findOne({ where: { name } })

            if (client == null) {
                res.json(null)
            }

            else {
                const validPassword = bcrypt.compareSync(password, client.dataValues.password)
                if (validPassword) {
                    const token = generateAccessToken(client.dataValues.id)
                    client.dataValues.password = null
                    res.json({ client, token })
                }
                else
                    res.json(null)
            }
        }
        catch (err) {
            next(err)
        }

    }

    async refresh(req, res) {
        const data = req.get('Authorization')

        try {
            const token = jwt.verify(data, secret)

            if (token) {
                const id = token.id
                const client = await Model.findOne({ where: { id }, attributes: ['name'] })
                res.json({ client })
            }

        }
        catch (e) {
            res.json(null)
        }
    }

    async delete(req, res, next) {

        try {
            const id = req.params.id
            const count = await Model.count();
            if (count > 1) {
                const items = await Model.destroy({ where: { id: id } })
                res.json(items)
            }
            else {
                throw 'Нельзя удалить последнего пользователя'
            }
        }
        catch (err) {
            next(err)
        }

    }
}

module.exports = new Service()