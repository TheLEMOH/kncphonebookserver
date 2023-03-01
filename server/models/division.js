const { DataTypes } = require('sequelize')
const db = require('../../db')

const OrganizationModel = require('./organization')

const Division = db.define('divisions', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING(100),
    },

    organizationId: {
        type: DataTypes.UUID,
        references: {
            model: OrganizationModel,
            key: 'id'
        }
    },

    type: {
        type: DataTypes.STRING(100),
        defaultValue: 'division'
    }

}, {
    /*     schema: 'employees', */
    sequelize: db,
    timestamps: false,
})

Division.belongsTo(OrganizationModel)
OrganizationModel.hasMany(Division)

module.exports = Division