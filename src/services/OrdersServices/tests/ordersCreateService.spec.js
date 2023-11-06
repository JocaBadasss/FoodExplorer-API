const OrdersCreateService = require("../OrdersCreateService")
const OrdersRepositoryInMemory = require("../../../repositories/InMemory/OrdersRepositoryInMemory")

describe("OrdersCreateService", () => {
  let ordersRepository
  let ordersCreateService

  beforeEach(() => {
    ordersRepository = new OrdersRepositoryInMemory()
    ordersCreateService = new OrdersCreateService(ordersRepository)
  })

  it("should be able to create a order", async () => {
    const dishs_ids = [
      { id: 1, quantity: 1 },
      { id: 2, quantity: 1 },
    ]
    const user_id = 1

    const order_id = await ordersCreateService.execute({
      dishs_ids,
      user_id,
    })

    expect(order_id).toBe(2)
  })

  it("should not be able to create a order with invalid dishs ids", async () => {
    const dishs_ids = [
      { id: 3, quantity: 1 },
      { id: 4, quantity: 1 },
    ]
    const user_id = 1

    const order_id = await ordersCreateService.execute({
      dishs_ids,
      user_id,
    })
  })
})
