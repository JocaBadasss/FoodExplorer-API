exports.up = (knex) =>
  knex.schema.createTable("orders", (table) => {
    table.increments("id")
    table.string("status")
    table.timestamp("created_at").defaultTo(knex.fn.now())
    
  })
exports.down = (knex) => knex.schema.dropTable("orders")
