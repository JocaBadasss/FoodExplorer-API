const TransactionOrderCreateService = require("../TransactionOrderCreateService")
const TransactionsRepositoryInMemory = require("../../../repositories/InMemory/TransactionsRepositoryInMemory")
const OrdersRepositoryInMemory = require("../../../repositories/InMemory/OrdersRepositoryInMemory")
const OrdersShowService = require("../../OrdersServices/OrdersShowService")

describe("TransactionOrderCreateService", () => {
  let transactionsRepository
  let ordersRepository
  let transactionOrderCreateService

  beforeEach(() => {
    transactionsRepository = new TransactionsRepositoryInMemory()
    ordersRepository = new OrdersRepositoryInMemory()
    transactionOrderCreateService = new TransactionOrderCreateService({
      transactionsRepository,
      ordersRepository,
    })
  })

  it("should be able to create a transaction with approved status", async () => {
    const transaction = await transactionOrderCreateService.execute({
      token: "hs78fhsa789fhgsa9fhas8fhas08fhas",
      issuer_id: "24",
      payment_method_id: "credit_card",
      installments: 1,
      description: "Prugna Pie",
      payer: {
        first_name: "APRO",
        email: "test@test.com",
        identification: {
          type: "CPF",
          number: "12345678909",
        },
      },
      dishs: [
        {
          id: 1,
          quantity: 1,
        },
      ],
      user_id: 1,
    })

    expect(transaction.status).toBe("approved")
  })

  it("should be able to create a transaction with rejected status", async () => {
    const transaction = await transactionOrderCreateService.execute({
      token: "hs78fhsa789fhgsa9fhas8fhas08fhas",
      issuer_id: "24",
      payment_method_id: "credit_card",
      installments: 1,
      description: "Prugna Pie",
      payer: {
        first_name: "OTHE",
        email: "test@test.com",
        identification: {
          type: "CPF",
          number: "12345678909",
        },
      },
      dishs: [
        {
          id: 1,
          quantity: 1,
        },
      ],
      user_id: 1,
    })

    expect(transaction.status).toBe("rejected")
  })
})
