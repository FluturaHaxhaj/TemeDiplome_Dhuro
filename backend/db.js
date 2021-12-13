const knex = require("knex");
const { attachPaginate } = require("knex-paginate");

const { NODE_ENV } = require("./config");

attachPaginate();
const knexfile = require("./knexfile");

const db = () => knex(knexfile[NODE_ENV]);

const timestamp = () => new Date().toUTCString();

module.exports = {
  db,
  timestamp,
};
