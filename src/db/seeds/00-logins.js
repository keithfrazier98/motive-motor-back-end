const logins = require('./00-logins.json')
exports.seed = function(knex) {
  return knex.raw("TRUNCATE TABLE logins RESTART IDENTITY CASCADE")
  .then(() => knex("logins").insert(logins))
};
