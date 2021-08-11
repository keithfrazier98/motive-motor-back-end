const knex = require("../db/connection");

function getUserData(user_id) {
  return knex("logins")
    .join("profiles", "profiles.user_id", "=", "logins.user_id")
    .join("preferences", "preferences.user_id", "=", "logins.user_id")
    .whereRaw(`logins.user_id = '${user_id}'`)
    .select("*")
    .first()
}

module.exports = {
  getUserData,
};
