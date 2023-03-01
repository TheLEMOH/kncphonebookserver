const { Op } = require("sequelize");

const CreateFilter = (query) => {
  const filter = {};

  for (let i in query) {
    if (i != "page" && i != "level" && i != "byLevel" && !i.includes("id")) filter[i] = { [Op.like]: `%${query[i]}%` };

    if (i.includes("id")) {
      filter[i] = query[i];
    }
  }

  return filter;
};

module.exports = CreateFilter;
