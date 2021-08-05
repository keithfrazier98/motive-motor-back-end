
exports.up = function(knex) {
  return knex.schema.createTable("preferences", (table) => {
    table.integer("user_id").references("user_id").inTable("logins").notNullable()
    table.text("theme_id")
})
};

exports.down = function(knex) {
  return knex.schema.dropTable("preferences")
};
