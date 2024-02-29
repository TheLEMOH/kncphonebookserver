const { QueryTypes } = require("sequelize");

const db = require("../../db");

class Service {
  async get(req, res) {
    const items = await db.query("SELECT * FROM `vw_rooms`", { type: QueryTypes.SELECT });
    res.json(items);
  }
}

module.exports = new Service();
