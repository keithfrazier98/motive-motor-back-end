const userPreferences = require('./02-preferences.json')
exports.seed = function(knex) {
  return knex.raw("TRUNCATE TABLE preferences RESTART IDENTITY")
  .then(() => knex("preferences").insert(userPreferences))
};