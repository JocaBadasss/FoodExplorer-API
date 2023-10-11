exports.up = (knex) =>
  knex.schema.createTable("dishes", (table) => {
    table.increments("id")
    table.string("name")
    table.string("category")
    table.text("description")
    table.integer("price_cents")
    table.string("image")
    table.integer("user_id").references("id").inTable("users")
    table.timestamp("created_at").defaultTo(knex.fn.now())
  })
exports.down = (knex) => knex.schema.dropTable("dishes")
