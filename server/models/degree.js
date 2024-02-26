const { DataTypes } = require('sequelize')
const db = require('../../db')

const degreesDefault = [{
    name: 'Кандидат наук'
}, {
    name: 'Доктор наук'
}]

const Degree = db.define('degrees', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING(100),
    },

}, {
    /*  schema: 'employees',  */
    sequelize: db,
    timestamps: false,
})

Degree.afterSync(async () => {

    const degrees = await Degree.findAll()

    if (degrees.length == 0)
        Degree.bulkCreate(degreesDefault)
})


module.exports = Degree