const AppError = require("../../utils/AppError")
const OrdersUpdateServiceValidationSchema = require("../../schemas/OrdersValidations/OrdersShowServiceValidation")

class OrdersUpdateService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute({ order_id, status }) {
    try {
      await OrdersUpdateServiceValidationSchema.validate(
        { order_id, status },
        {
          abortEarly: false,
        }
      )
    } catch (error) {
      throw new AppError(`Erro de validação: ${error.message}`)
    }

    try {
      await this.ordersRepository.updateOrderStatus({
        order_id,
        status,
      })

      return
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

module.exports = OrdersUpdateService
