const { Sequelize } = require('sequelize');
const db = new Sequelize('postgres://postgres:admin@localhost/phonebook', { logging: false })

try {
    db.authenticate();
    console.log('Подключено')
} catch (error) {
    console.error('Ошибка', error);
}

module.exports = db