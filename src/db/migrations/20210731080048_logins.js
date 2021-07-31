exports.up = function(knex) {
  return knex.schema.createTable("logins", (table) => {
      table.increments("user_id").primary()
      table.text("email").notNullable()
      table.text("password").notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("logins")
};
