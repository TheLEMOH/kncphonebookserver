const { limit } = require("../config");
const Organization = require("../models/organization");
const Degree = require('../models/degree')
const Model = require("../models/individual");

const CreateFilter = require("../scripts/createfilters");
const Offset = require("../scripts/offset");

class Service {
  async create(req, res, next) {
    try {
      await Model.create(req.body);
      res.json(true);
    } catch (err) {
      next(err);
    }
  }

  async getPages(req, res, next) {
    try {
      const filter = CreateFilter(req.query);
      const individual = filter.name ? { name: filter.name } : null;
      const organizationFilter = filter.organization ? { shortName: filter.organization } : null;

      const offset = Offset(req);

      const items = await Model.findAndCountAll({
        where: individual,
        offset: offset,
        limit: limit,
        include: [{ where: organizationFilter, model: Organization }],
      });
      res.json(items);
    } catch (err) {
      next(err);
    }
  }

  async get(req, res, next) {
    try {
      const items = await Model.findAll({
        order: ["name"],
        include: [{ model: Organization }, { model: Degree }],
      });
      res.json(items);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      const id = req.params.id;
      const item = await Model.findOne({ where: { id: id } });
      res.json(item);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;
      const items = await Model.update(req.body, { where: { id: id } });
      res.json(items);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      const items = await Model.destroy({ where: { id: id } });
      res.json(items);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new Service();
