const { DataTypes } = require("sequelize");
const db = require("../../db");

const DivisionModel = require("./division");
const OrganizationModel = require("./organization");

const Subdivision = db.define(
  "subdivisions",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
    },

    divisionId: {
      type: DataTypes.UUID,
      references: {
        model: DivisionModel,
        key: "id",
      },
    },

    organizationId: {
      type: DataTypes.UUID,
      references: {
        model: OrganizationModel,
        key: "id",
      },
    },

    type: {
      type: DataTypes.STRING(100),
      defaultValue: "subdivision",
    },
  },
  {
   /*  schema: "employees", */
    sequelize: db,
    timestamps: false,
  }
);

Subdivision.belongsTo(DivisionModel);
Subdivision.belongsTo(OrganizationModel);
OrganizationModel.hasMany(Subdivision);
DivisionModel.hasMany(Subdivision);

module.exports = Subdivision;
