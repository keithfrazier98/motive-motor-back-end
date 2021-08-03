
exports.up = function(knex) {
 return knex.schema.createTable("user-profiles", (table) => {
     table.foreign("user_id").references("logins.user_id")
     table.text("first_name").notNullable()
     table.text("last_name").notNullable()
     table.text("theme_id").notNullable()
     table.text("profile_img_pointer")
 })
};

exports.down = function(knex) {
  return knex.schema.dropTable("user-profiles")
};
