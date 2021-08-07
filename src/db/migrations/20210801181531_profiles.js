
exports.up = function(knex) {
 return knex.schema.createTable("profiles", (table) => {
     table.integer("user_id").references("user_id").inTable("logins")
     table.text("first_name").notNullable()
     table.text("last_name").notNullable()
     table.text("profile_img_pointer")
 })
};

exports.down = function(knex) {
  return knex.schema.dropTable("profiles")
};
