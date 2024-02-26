const { DataTypes } = require("sequelize");
const db = require("../../db");

const OrganizationModel = require("./organization");
const DegreeModel = require("./degree");

const Individual = db.define(
  "individuals",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
    },

    degreeId: {
      type: DataTypes.UUID,
      references: {
        model: DegreeModel,
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
  },
  {
   /*  schema: 'employees', */
    sequelize: db,
    timestamps: false,
  }
);


Individual.belongsTo(OrganizationModel);
Individual.belongsTo(DegreeModel);

OrganizationModel.hasMany(Individual);
DegreeModel.hasMany(Individual);

module.exports = Individual;
