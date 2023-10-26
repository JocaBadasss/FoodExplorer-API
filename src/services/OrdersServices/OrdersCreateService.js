class OrdersCreateService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute({ dishs_ids, user_id }) {
    const order_id = await this.ordersRepository.createOrder({
      dishs_ids,
      user_id,
    })

    return order_id
  }
}

module.exports = OrdersCreateService
