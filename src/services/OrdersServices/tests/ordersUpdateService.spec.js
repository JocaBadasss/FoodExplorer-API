const OrdersUpdateService = require("../OrdersUpdateService")
const OrdersRepositoryInMemory = require("../../../repositories/InMemory/OrdersRepositoryInMemory")

describe("OrdersUpdateService", () => {
  let ordersRepository
  let ordersUpdateService

  beforeEach(() => {
    ordersRepository = new OrdersRepositoryInMemory()
    ordersUpdateService = new OrdersUpdateService(ordersRepository)
  })

  it("should be able to update a order status", async () => {
    const order_id = 2
    const status = "entregue"
    await ordersUpdateService.execute({ order_id, status })

    const order = ordersRepository.orders.find((order) => order.id === order_id)

    expect(order.status).toBe(status)
  })
})
