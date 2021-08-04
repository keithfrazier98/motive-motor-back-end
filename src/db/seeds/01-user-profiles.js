const userProfiles = require('./01-user-profiles.json')
exports.seed = function(knex) {
  return knex.raw("TRUNCATE TABLE user-profiles RESTART IDENTITY CASCADE")
  .then(() => knex("user-profiles").insert(userProfiles))
};
