const { DataTypes } = require('sequelize')
const db = require('../../db')

const bcrypt = require('bcrypt');
const salt = 3

const User = db.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING(100),
    },

    password: {
        type: DataTypes.STRING,

    },
}, {
  /*   schema: 'employees', */
    sequelize: db,
    timestamps: false,
    hooks: {
        beforeCreate: (user) => {
            const hashPassword = bcrypt.hashSync(user.password, salt);
            user.password = hashPassword
        },
    }
})


User.afterSync(async () => {

    const user = await User.findAll()

    if (user.length == 0)
        User.create({ name: 'Admin', password: 'Admin' })
})

module.exports = User