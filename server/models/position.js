const { DataTypes } = require("sequelize");
const db = require("../../db");

const Position = db.define(
  "positions",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
    },

    levelSort: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    /*     schema: 'employees', */
    sequelize: db,
    timestamps: false,
  }
);


module.exports = Position;
