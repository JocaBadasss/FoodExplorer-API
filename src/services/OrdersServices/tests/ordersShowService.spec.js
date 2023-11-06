const OrdersShowService = require("../OrdersShowService")
const OrdersRepositoryInMemory = require("../../../repositories/InMemory/OrdersRepositoryInMemory")

describe("OrdersShowService", () => {
  let ordersRepository
  let ordersShowService

  beforeEach(() => {
    ordersRepository = new OrdersRepositoryInMemory()
    ordersShowService = new OrdersShowService(ordersRepository)
  })

  it("should be able to show user orders", async () => {
    const user_id = 1
    const status = "pendente"

    const orders = await ordersShowService.execute({ user_id }, status)
    const expectedData = [
      { dishs: [{ name: "Dish 1", quantity: 1 }], id: 1, status: "pendente" },
    ]

    expect(orders).toEqual(expectedData)
  })

  it("should be able to show user orders without status", async () => {
    const user_id = 1

    const orders = await ordersShowService.execute({ user_id })

    const expectedData = [
      { dishs: [{ name: "Dish 1", quantity: 1 }], id: 1, status: "pendente" },
    ]

    expect(orders).toEqual(expectedData)
  })
})
