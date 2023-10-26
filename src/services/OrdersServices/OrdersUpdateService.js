class OrdersUpdateService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute({ order_id }) {
    await this.ordersRepository.updateOrderStatus({
      order_id,
    })
  }
}

module.exports = OrdersUpdateService
