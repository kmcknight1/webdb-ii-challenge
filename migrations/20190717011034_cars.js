exports.up = function(knex) {
  return knex.schema.createTable("cars", table => {
    table.increments();
    table
      .string("vin")
      .unique()
      .notNullable();
    table.string("make", 32).notNullable();
    table.string("model", 32).notNullable();
    table.integer("mileage").notNullable();
    table.string("transmission_type", 32);
    table.string("title_status");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
