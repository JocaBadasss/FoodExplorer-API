const knex = require("../database/knex")
const MercadoPagoRepository = require("../repositories/MercadoPagoRepository")

class TransactionsRepository {
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

    const total = dishsPrices.reduce((a, b) => a + b, 0) / 100

    return total
  }

  async createTransaction(paymentData) {
    const mercadoPagoRepository = new MercadoPagoRepository()



    const response = await mercadoPagoRepository.createPayment(paymentData)

    return response
  }

  async createOrderHistory({ user_id, status, details }) {
    
  }
}

module.exports = TransactionsRepository
