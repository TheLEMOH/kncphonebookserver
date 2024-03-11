const { limit } = require("../config");
const Organization = require("../models/organization");
const Division = require("../models/division");
const Degree = require("../models/degree");
const Subdivision = require("../models/subdivision");
const Position = require("../models/position");
const Model = require("../models/employee");
const Individual = require("../models/individual");
const Employment = require("../models/employment");

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

  async createbulk(req, res, next) {
    try {
      const { json, organizationId, type } = req.body;
      const organization = await Organization.findOne({ where: { id: organizationId } });

      if (type == "create") {
        const forCreate = json.filter((item) => !item.id);
        const forUpdate = json.filter((item) => item.id);

        forCreate.forEach((item) => {
          delete item.id;
          item.organizationId = organizationId;
          item.address = organization.address;
        });

        forUpdate.forEach((item) => {
          Model.update(item, { where: { id: item.id } });
        });

        await Model.bulkCreate(forCreate);
      }

      if (type == "replace") {
        await Model.destroy({ where: { organizationId } });

        json.forEach((item) => {
          delete item.id;
          item.organizationId = organizationId;
          item.address = organization.address;
        });

        await Model.bulkCreate(json);
      }

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
      const organizationFilter = filter.organization ? { shortName: filter.organization } : null;
      const divisionFilter = filter.division ? { name: filter.division } : null;
      const subDivisionFilter = filter.subdivision ? { name: filter.subdivision } : null;
      const positionFilter = filter.position ? { name: filter.position } : null;
      const employmentFilter = filter.employment ? { name: filter.employment } : null;
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
          { where: divisionFilter, model: Division },
          { where: positionFilter, model: Position },
          { model: Individual, include: [{ model: Degree }] },
          { where: employmentFilter, model: Employment },
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
      const organizationFilter = filter.organization ? { shortName: filter.organization } : null;
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
      const filter = CreateFilter(req.query);
      const items = await Model.findAll({
        order: ["name"],
        include: [{ model: Organization, where: filter }, { model: Subdivision }, { model: Position }],
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

  async getByIdSubdivision(req, res, next) {
    try {
      const id = req.params.id;
      const item = await Model.findAll({ where: { subdivisionId: id }, include: [{ model: Position }] });

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
