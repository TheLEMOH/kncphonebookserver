const { DataTypes } = require("sequelize");
const db = require("../../db");

const OrganizationModel = require("./organization");

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

    organizationId: {
      type: DataTypes.UUID,
      references: {
        model: OrganizationModel,
        key: "id",
      },
    },
  },
  {
    /*   schema: 'employees', */
    sequelize: db,
    timestamps: false,
  }
);


Individual.belongsTo(OrganizationModel);
OrganizationModel.hasMany(Individual);



module.exports = Individual;
