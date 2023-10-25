const knex = require("../database/knex")

class Order_testeController {
  async create(req, res) {
    const { dishs, user_id } = req.body

    const [order_id] = await knex("orders").insert({ status: "pendente" })

    await knex("orders_dishs").insert(
      dishs.map((dish) => {
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

    return res.json({ id: order_id })
  }

  async index(req, res) {
    const { user_id } = req.body

    const orders = await knex("orders as o")
      .select("o.id", "o.status", "od.quantity", "d.name")
      .join("orders_history as oh", "o.id", "oh.order_id")
      .join("orders_dishs as od", "o.id", "od.order_id")
      .join("dishes as d", "od.dish_id", "d.id")
      .where("oh.user_id", user_id)

    return res.json(orders)
  }
}

module.exports = Order_testeController
