const AppError = require("../../utils/AppError")

class OrdersShowService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute({ user_id }, status) {
    try {
      const orders = await this.ordersRepository.showUserOrders(user_id, status)

      const groupedOrders = orders.reduce((result, order) => {
        const dish = {
          quantity: order.quantity,
          name: order.name,
        }

        const existingOrder = result.find(
          (orderMapped) => orderMapped.id === order.id
        )

        if (existingOrder) {
          existingOrder.dishs.push(dish)
        } else {
          result.push({ id: order.id, status: order.status, dishs: [dish] })
        }

        return result
      }, [])

      return groupedOrders
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

module.exports = OrdersShowService
