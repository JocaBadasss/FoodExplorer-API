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

    expect(Array.isArray(orders)).toBe(true)
    expect(orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status: "pendente",
          id: expect.any(Number),
          dishs: expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              quantity: expect.any(Number),
            }),
          ]),
        }),
      ])
    )
  })

  it("should be able to show user orders without status", async () => {
    const user_id = 1

    const orders = await ordersShowService.execute({ user_id })

    expect(Array.isArray(orders)).toBe(true)
    expect(orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          status: expect.any(String),
          dishs: expect.arrayContaining([
            expect.objectContaining({
              quantity: expect.any(Number),
              name: expect.any(String),
            }),
          ]),
        }),
      ])
    )
  })
})
