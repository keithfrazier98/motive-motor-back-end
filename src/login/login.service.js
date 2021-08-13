const knex = require("../db/connection");

async function read(type, key, pass) {
  console.log(type, key, pass, "service");
  let response;
  switch (type) {
    case "google":
    case "fb_login_id":
      response = knex("logins")
        .whereRaw(`${type} = '${key}'`)
        .select("user_id")
        .first();
      break;
    case "email":
      const {user_id} = await knex("logins")
        .whereRaw(`${type} = '${key}'`)
        .select("user_id")
        .first();
        console.log(user_id)
      if (user_id) {
        const correctPass = await knex("logins")
          .where({ user_id: user_id, password: pass })
          .select("user_id")
          .first();

        if (correctPass) {
          response = user_id;
        } else {
          response = "badpass";
        }
      }
      break;
    default:
      response = "invalid login type";
  }
  console.log(response)
  return response;
}

function createUserLogin(email, password, fb_login_id) {
  console.log(email, password);
  return knex("logins").insert({ email, password, fb_login_id }).returning("*");
}

function createUserProfile(user_id, first_name, last_name) {
  return knex("profiles")
    .insert({ user_id, first_name, last_name })
    .returning("*");
}

function addUserPreferences(user_id, theme_id) {
  return knex("preferences").insert({ user_id, theme_id }).returning("*");
}

module.exports = {
  read,
  createUserProfile,
  addUserPreferences,
  createUserLogin,
};
