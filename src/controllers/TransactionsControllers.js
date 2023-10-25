const TransactionsRepository = require("../repositories/TransactionsRepository")
const TransactionsCreateService = require("../services/TransactionsServices/TransactionsCreateService")

class TransactionsControllers {
  async create(req, res) {
    const {
      token,
      issuer_id,
      payment_method_id,
      installments,
      description,
      payer,
      dishs,
    } = req.body

    const transactionsRepository = new TransactionsRepository()
    const transactionsCreateService = new TransactionsCreateService(
      transactionsRepository
    )

    const transaction = await transactionsCreateService.execute({
      token,
      issuer_id,
      payment_method_id,
      installments,
      description,
      payer,
      dishs,
    })

    return res.json(transaction)
  }
}

module.exports = TransactionsControllers
