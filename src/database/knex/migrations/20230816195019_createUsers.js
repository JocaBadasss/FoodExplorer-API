
exports.up = knex => knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("email")
    table.text("password")
    table.string("role")
    table.timestamp("created_at").defaultTo(knex.fn.now());

})  ;
exports.down = knex => knex.schema.dropTable("users");
