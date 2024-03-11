const { QueryTypes } = require("sequelize");

const db = require("../../db");

class Service {
  async getByLevel(req, res, next) {
    try {
      const { fl } = req.query;

      if (fl) {
        const items = await db.query(`SELECT * FROM employees.vw_rooms WHERE fl = ${fl}`, { type: QueryTypes.SELECT });
        res.json(items);
      } else {
        res.json([]);
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new Service();
