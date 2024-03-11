const { Sequelize } = require("sequelize");

const db = new Sequelize("postgres://postgres:admin@localhost/phonebook", { logging: false });

/* const db = new Sequelize('postgres://employees_service:jksdh42go213@172.16.132.72/elsan_db', { logging: false }) */

try {
  db.authenticate();
  console.log("Подключено");
} catch (error) {
  console.error("Ошибка", error);
}

module.exports = db;
