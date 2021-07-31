const knex = require("../db/connection");

function read(email) {
  return knex("logins")
  .whereRaw(`email = '${email}'`)
  .select("*")
  .first();
}

module.exports = {
    read
}
