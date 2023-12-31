const knex = require("../database/knex")

class OrdersRepository {
  async createOrder({ dishs_ids, user_id }) {
    const [order_id] = await knex("orders").insert({ status: "Pendente" })

    await knex("orders_dishs").insert(
      dishs_ids.map((dish) => {
        return {
          dish_id: dish.id,
          order_id,
          quantity: dish.quantity,
        }
      })
    )

    await knex("orders_history").insert({
      user_id,
      order_id,
    })

    return order_id
  }

  async updateOrderStatus({ order_id, status }) {
    await knex("orders").where({ id: order_id }).update({ status })

    return
  }

  async showUserOrders(user_id, status) {
    if (status) {
      const orders = await knex("orders as o")
        .select("o.id", "o.status", "od.quantity", "d.name", "oh.created_at")
        .join("orders_history as oh", "o.id", "oh.order_id")
        .join("orders_dishs as od", "o.id", "od.order_id")
        .join("dishes as d", "od.dish_id", "d.id")
        .where("oh.user_id", user_id)
        .where("o.status", status)

      return orders
    }
    if (!status) {
      const orders = await knex("orders as o")
        .select("o.id", "o.status", "od.quantity", "d.name", "oh.created_at")
        .join("orders_history as oh", "o.id", "oh.order_id")
        .join("orders_dishs as od", "o.id", "od.order_id")
        .join("dishes as d", "od.dish_id", "d.id")
        .where("oh.user_id", user_id)

      return orders
    }

    return orders
  }

  async indexAllOrders(status) {
    if (status) {
      const orders = await knex("orders as o")
        .select("o.id", "o.status", "od.quantity", "d.name", "oh.created_at")
        .join("orders_history as oh", "o.id", "oh.order_id")
        .join("orders_dishs as od", "o.id", "od.order_id")
        .join("dishes as d", "od.dish_id", "d.id")
        .where("o.status", status)

      return orders
    }

    if (!status) {
      const orders = await knex("orders as o")
        .select("o.id", "o.status", "od.quantity", "d.name", "oh.created_at")
        .join("orders_history as oh", "o.id", "oh.order_id")
        .join("orders_dishs as od", "o.id", "od.order_id")
        .join("dishes as d", "od.dish_id", "d.id")

      return orders
    }

    return orders
  }
}

module.exports = OrdersRepository
