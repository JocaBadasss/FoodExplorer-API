const OrdersIndexService = require("../OrdersIndexService")
const OrdersRepositoryInMemory = require("../../../repositories/InMemory/OrdersRepositoryInMemory")

describe("OrdersIndexService", () => {
  let ordersRepositoryInMemory
  let ordersIndexService

  beforeEach(() => {
    ordersRepositoryInMemory = new OrdersRepositoryInMemory()
    ordersIndexService = new OrdersIndexService(ordersRepositoryInMemory)
  })

  it("should index all orders", async () => {
    const status = "pendente"

    const orders = await ordersIndexService.execute(status)

    expect(Array.isArray(orders)).toBe(true)
    expect(orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          status: expect.any(String),
          created_at: expect.any(String),
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

  it("should index all orders without status", async () => {
    const orders = await ordersIndexService.execute()

    expect(Array.isArray(orders)).toBe(true)
    expect(orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          status: expect.any(String),
          created_at: expect.any(String),
          dishs: expect.arrayContaining([
            expect.objectContaining({
              quantity: expect.any(Number),
              name: expect.any(String),
            }),
          ]),
        }),
        expect.objectContaining({
          id: expect.any(Number),
          status: expect.any(String),
          created_at: expect.any(String),
          dishs: expect.arrayContaining([
            expect.objectContaining({
              quantity: expect.any(Number),
              name: expect.any(String),
            }),
          ]),
        }),
        expect.objectContaining({
          id: expect.any(Number),
          status: expect.any(String),
          created_at: expect.any(String),
          dishs: expect.arrayContaining([
            expect.objectContaining({
              quantity: expect.any(Number),
              name: expect.any(String),
            }),
          ]),
        }),
      ])
    )

    expect(orders)
  })
})
