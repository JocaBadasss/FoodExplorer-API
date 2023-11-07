const TransactionsCreateService = require("../TransactionsCreateService")
const TransactionsRepositoryInMemory = require("../../../repositories/InMemory/TransactionsRepositoryInMemory")

describe("TransactionsCreateService", () => {
  it("should be able to process a new transaction with approved status", async () => {
    const transactionsRepository = new TransactionsRepositoryInMemory()
    const transactionsCreateService = new TransactionsCreateService(
      transactionsRepository
    )

    const response = await transactionsCreateService.execute({
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
      transaction_amount: 1000,
    })

    expect(response.status).toBe("approved")
  })

  it("should be able to process a new transaction with rejected status", async () => {
    const transactionsRepository = new TransactionsRepositoryInMemory()

    const transactionsCreateService = new TransactionsCreateService(
      transactionsRepository
    )

    const response = await transactionsCreateService.execute({
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
      transaction_amount: 1000,
    })

    expect(response.status).toBe("rejected")
  })

  it("should be able to create a new order when was creating a new transaction", async () => {

    const transactionsRepository = new TransactionsRepositoryInMemory()

    const transactionsCreateService = new TransactionsCreateService(
      transactionsRepository
    )

    
  })
})
