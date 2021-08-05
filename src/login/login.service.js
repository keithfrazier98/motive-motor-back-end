const knex = require("../db/connection");

function read(email) {
  return knex("logins").whereRaw(`email = '${email}'`).select("*").first();
}

function createUserLogin(email, password) {
  console.log(email, password)
  return knex("logins")
    .insert({email, password})
    .returning("*")
}

function createUserProfile(user_id, first_name, last_name) {
  return knex("profiles")
    .insert({user_id, first_name, last_name})
    .returning("*")
}

function addUserPreferences(user_id, theme_id) {
  return knex("preferences")
    .insert({user_id, theme_id})
    .returning("*")
}

module.exports = {
  read,
  createUserProfile,
  addUserPreferences,
  createUserLogin,
};
