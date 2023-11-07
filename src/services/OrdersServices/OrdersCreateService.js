const AppError = require("../../utils/AppError")

class OrdersCreateService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute({ dishs_ids, user_id }) {
    try {
      const order_id = await this.ordersRepository.createOrder({
        dishs_ids,
        user_id,
      })

      return order_id
    } catch (error) {
      throw new AppError(error.message)
    }
  }
}

module.exports = OrdersCreateService
