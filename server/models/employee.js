const { DataTypes } = require("sequelize");
const db = require("../../db");

const OrganizationModel = require("./organization");
const DivisionModel = require("./division");
const SubdivisionModel = require("./subdivision");
const PositionModel = require("./position");
const IndividualModel = require("./individual");

const Employee = db.define(
  "employees",
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

    divisionId: {
      type: DataTypes.UUID,
      references: {
        model: DivisionModel,
        key: "id",
      },
    },

    subdivisionId: {
      type: DataTypes.UUID,
      references: {
        model: SubdivisionModel,
        key: "id",
      },
    },

    positionId: {
      type: DataTypes.UUID,
      references: {
        model: PositionModel,
        key: "id",
      },
    },

    phone: {
      type: DataTypes.STRING(100),
    },

    email: {
      type: DataTypes.STRING(100),
    },

    address: {
      type: DataTypes.STRING(100),
    },

    individualId: {
      type: DataTypes.UUID,
      references: {
        model: IndividualModel,
        key: "id",
      },
    },

    floor: {
      type: DataTypes.INTEGER,
    },

    room: {
      type: DataTypes.STRING,
    },

    /*  the_geom: {
       type: DataTypes.GEOMETRY("POINT"),
     }, */

    levelSort: {
      type: DataTypes.INTEGER,
    },
  },
  {
    /*     schema: 'employees', */
    sequelize: db,
    timestamps: false,
  }
);

Employee.belongsTo(OrganizationModel);
Employee.belongsTo(DivisionModel);
Employee.belongsTo(SubdivisionModel);
Employee.belongsTo(PositionModel);
Employee.belongsTo(IndividualModel,);

OrganizationModel.hasMany(Employee);
DivisionModel.hasMany(Employee);
SubdivisionModel.hasMany(Employee);
PositionModel.hasMany(Employee);
IndividualModel.hasMany(Employee,);

module.exports = Employee;
