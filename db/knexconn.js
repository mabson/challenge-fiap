const knx = require("knex");
const config = require("./knexfile");
const knex = knx(config.production);

module.exports = { knex };
