exports.up = function (knex) {
  return knex.schema.table("orders_dishs", function (table) {
    table.integer("quantity").notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.table("orders_dishs", function (table) {
    table.dropColumn("quantity")
  })
}
