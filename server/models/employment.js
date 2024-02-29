const { DataTypes } = require("sequelize");
const db = require("../../db");

const employmentDefault = [
  {
    name: "Основное место работы",
  },
  {
    name: "Внутреннее совместительство",
  },
  {
    name: "Внешнее совместительство",
  },
];

const Employment = db.define(
  "employments",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(50),
    },
  },
  {
    /*  schema: 'employees',  */
    sequelize: db,
    timestamps: false,
  }
);

Employment.afterSync(async () => {
  const employments = await Employment.findAll();
  if (employments.length == 0) Employment.bulkCreate(employmentDefault);
});

module.exports = Employment;
