const knex = require("../database/knex")
const PaymentGateWayRepository = require("../../repositories/")

class TransactionsRepository {
  dishs = []
  async verifyDishsAmountByIds(dishs) {
    const dishsPrices = await Promise.all(
      dishs.map(async (dish) => {
        const dishPrice = await knex("dishes")
          .select("price_cents")
          .where({ id: dish.id })
          .first()

        return dishPrice.price_cents * dish.quantity
      })
    )

    const total = dishsPrices.reduce((a, b) => a + b, 0)

    return total
  }
}

module.exports = TransactionsRepository
