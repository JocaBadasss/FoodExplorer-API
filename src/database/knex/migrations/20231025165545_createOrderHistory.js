exports.up = (knex) =>
  knex.schema.createTable("orders_history", (table) => {
    table.increments("id")
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
    table
      .integer("order_id")
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE")
    table.timestamp("created_at").defaultTo(knex.fn.now())
  })
exports.down = (knex) => knex.schema.dropTable("orders_history")
