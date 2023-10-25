exports.up = (knex) =>
  knex.schema.createTable("orders_history", (table) => {
    table.increments("id")
    table.integer("user_id").references("id").inTable("users")
    table.integer("order_id").references("id").inTable("orders")
    table.timestamp("created_at").defaultTo(knex.fn.now())
  })
exports.down = (knex) => knex.schema.dropTable("orders_history")
