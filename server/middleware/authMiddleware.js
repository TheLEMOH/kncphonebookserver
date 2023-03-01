const jwt = require('jsonwebtoken')
const { secret } = require('../config')
module.exports = function (req, res, next) {
    if (req.methods == 'OPTIONS') {
        next()
    }

    try {
        const header = req.get('Authorization')

        if (header == null) {
            throw 'Пользователь не авторизован'
        }

        const decodeData = jwt.verify(header, secret)

        req.user = decodeData

        next()

    }

    catch (e) {
        const error = e.toString()
        return res.status(403).json({ message: error })
    }

}