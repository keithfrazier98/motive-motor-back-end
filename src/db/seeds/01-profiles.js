const userProfiles = require('./01-profiles.json')
exports.seed = function(knex) {
  return knex.raw("TRUNCATE TABLE profiles RESTART IDENTITY")
  .then(() => knex("profiles").insert(userProfiles))
};
