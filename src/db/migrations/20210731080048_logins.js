exports.up = function(knex) {
  return knex.schema.createTable("logins", (table) => {
      table.increments("user_id").primary()
      table.string("email")
      table.string("password")
      table.text("fb_login_id")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("logins")
};
