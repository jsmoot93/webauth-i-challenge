exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", table => {
      table.increments();
      table
        .string("username", 128)
        .notNullable()
        .unique();
      table.string("password", 30).notNullable();
      table.string("first_name", 20);
      table.string("last_name", 20);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users");
  };