const { limit } = require("../config");
const Degree = require("../models/degree");
const Organization = require("../models/organization");
const Division = require("../models/division");
const Subdivision = require("../models/subdivision");
const Position = require("../models/Position");
const Model = require("../models/employee");
const Individual = require("../models/individual");

const CreateFilter = require("../scripts/createfilters");
const Offset = require("../scripts/offset");

class Controller {
  async create(req, res, next) {
    try {
      await Model.create(req.body);
      res.json(true);
    } catch (err) {
      next(err);
    }
  }

  async createbulk(req, res, next) {
    try {
      const { json, organizationId } = req.body;
      const organization = await Organization.findOne({ where: { id: organizationId } });

      json.forEach((j) => {
        j.organizationId = organizationId;
        j.address = organization.address;
      });

      await Model.bulkCreate(json);

      res.json(true);
    } catch (err) {
      next(err);
    }
  }

  async getPages(req, res, next) {
    try {
      const { byLevel } = req.query;
      const filter = CreateFilter(req.query);
      const rawEmployeersFilter = { room: filter.room, name: filter.name, phone: filter.phone, email: filter.email };
      const organizationFilter = filter.organization ? { name: filter.organization } : null;
      const divisionFilter = filter.division ? { name: filter.division } : null;
      const subDivisionFilter = filter.subdivision ? { name: filter.subdivision } : null;
      const positionFilter = filter.position ? { name: filter.position } : null;
      const employeerFilter = Object.fromEntries(Object.entries(rawEmployeersFilter).filter(([_, v]) => v != null));

      const offset = Offset(req);

      let order = byLevel === "true" ? [["levelSort", "DESC"]] : ["name"];

      const items = await Model.findAndCountAll({
        where: employeerFilter,
        order: order,
        offset: offset,
        limit: limit,
        include: [
          { where: organizationFilter, model: Organization },
          { where: subDivisionFilter, model: Subdivision },
          { model: Degree },
          { where: divisionFilter, model: Division },
          { where: positionFilter, model: Position },
        ],
      });
      res.json(items);
    } catch (err) {
      next(err);
    }
  }

  async getPagesGroup(req, res, next) {
    try {
      const { byLevel } = req.query;
      const filter = CreateFilter(req.query);
      const rawEmployeersFilter = { room: filter.room, name: filter.name, phone: filter.phone, email: filter.email };
      const organizationFilter = filter.organization ? { name: filter.organization } : null;
      const divisionFilter = filter.division ? { name: filter.division } : null;
      const subDivisionFilter = filter.subdivision ? { name: filter.subdivision } : null;
      const positionFilter = filter.position ? { name: filter.position } : null;
      const employeerFilter = Object.fromEntries(Object.entries(rawEmployeersFilter).filter(([_, v]) => v != null));

      const offset = Offset(req);

      let order = byLevel === "true" ? [["levelSort", "DESC"]] : ["name"];

      const items = await Individual.findAndCountAll({
        order: ["name"],
        include: {
          model: Model,
          where: employeerFilter,
          order: order,
          offset: offset,
          limit: limit,
          include: [
            { where: organizationFilter, model: Organization },
            { where: subDivisionFilter, model: Subdivision },
            { model: Degree },
            { where: divisionFilter, model: Division },
            { where: positionFilter, model: Position },
          ],
        },
      });

      const filteredItems = items.rows.filter((i) => i.employees.length != 0);

      items.rows = filteredItems;

      res.json(items);
    } catch (err) {
      next(err);
    }
  }

  async get(req, res, next) {
    try {
      const items = await Model.findAll({
        order: ["name"],
        include: [{ model: Organization }, { model: Subdivision }, { model: Degree }],
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

module.exports = new Controller();
