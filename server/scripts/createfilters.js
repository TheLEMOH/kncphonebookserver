const { Op } = require("sequelize");

const CreateFilter = (query) => {
  const filter = {};

  for (let i in query) {
    if (i != "page" && i != "level" && i != "byLevel" && i != "levelSort" && !i.includes("id")) filter[i] = { [Op.like]: `%${query[i]}%` };

    if (i.includes("id")) {
      filter[i] = query[i];
    }

    if (i == "levelSort" && query[i]) {

      if (isNaN(query[i])) {
        filter[i] = null;
      }
      else {
        filter[i] = query[i];
      }
    }
  }

  return filter;
};

module.exports = CreateFilter;
