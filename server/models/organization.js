const { DataTypes } = require('sequelize')
const db = require('../../db')

const Organization = db.define('organizations', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
    },
    shortName: {
        type: DataTypes.STRING(100),
    },
    name: {
        type: DataTypes.STRING(255),
    },
    address: {
        type: DataTypes.STRING(100),
    },
    type: {
        type: DataTypes.STRING(100),
        defaultValue: 'organization'
    }

}, {
/*     schema: 'employees', */
    sequelize: db,
    timestamps: false,
})

module.exports = Organization