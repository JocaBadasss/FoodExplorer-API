class TransactionsCreateService {
  constructor(TransactionsRepository) {
    this.TransactionsRepository = TransactionsRepository
  }

  async execute({
    token,
    issuer_id,
    payment_method_id,
    installments,
    description,
    payer,
    dishs,
  }) {
    const getDishsAmount =
      await this.TransactionsRepository.verifyDishsAmountByIds(dishs)

    const transaction_amount = getDishsAmount

    const paymentData = {
      transaction_amount,
      token,
      issuer_id,
      payment_method_id,
      installments,
      description,
      payer,
    }

    const createOrder = await this.TransactionsRepository.createOrderHistory({
      user_id: null,
      status: "pending",
      dishs,
    })
    

    const response = await this.TransactionsRepository.createTransaction(
      paymentData
    )

    return response
  }
}

module.exports = TransactionsCreateService
