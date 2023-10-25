exports.up = (knex) =>
  knex.schema.createTable("orders_dishs", (table) => {
    table.increments("id")
    table.integer("order_id").references("id").inTable("orders")
    table.integer("dish_id").references("id").inTable("dishes")
    table.integer("quantity")
  })
exports.down = (knex) => knex.schema.dropTable("orders_dishs")
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
