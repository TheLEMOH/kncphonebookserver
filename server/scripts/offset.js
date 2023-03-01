const { limit } = require('../config')

const Offset = (req) => {
    const page = req.query.page || 1
    return (page - 1) * limit
}

module.exports = Offset