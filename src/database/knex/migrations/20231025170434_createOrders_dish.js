exports.up = (knex) =>
  knex.schema.createTable("orders_dishs", (table) => {
    table.increments("id")
    table
      .integer("order_id")
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE")
    table
      .integer("dish_id")
      .references("id")
      .inTable("dishes")
      .onDelete("CASCADE")
    table.integer("quantity")
  })
exports.down = (knex) => knex.schema.dropTable("orders_dishs")

