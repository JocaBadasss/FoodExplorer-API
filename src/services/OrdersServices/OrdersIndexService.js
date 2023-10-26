class OrdersIndexService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository
  }

  async execute(status) {
    const orders = await this.ordersRepository.indexAllOrders(status)

    const groupedOrders = orders.reduce((result, order) => {
      const dish = {
        quantity: order.quantity,
        name: order.name,
      }

      const existingOrder = result.find((o) => o.id === order.id)

      if (existingOrder) {
        existingOrder.dishs.push(dish)
      } else {
        result.push({
          id: order.id,
          status: order.status,
          created_at: order.created_at,
          dishs: [dish],
        })
      }

      return result
    }, [])

    return groupedOrders
  }
}

module.exports = OrdersIndexService
