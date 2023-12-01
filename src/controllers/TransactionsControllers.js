const TransactionOrderCreateService = require("../services/TransactionsOrderServices/TransactionOrderCreateService")
const TransactionsRepository = require("../repositories/TransactionsRepository")
const OrdersRepository = require("../repositories/OrdersRepository")

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

    const user_id = req.user.id

    const ordersRepository = new OrdersRepository()
    const transactionsRepository = new TransactionsRepository()

    const transactionOrderCreateService = new TransactionOrderCreateService({
      transactionsRepository,
      ordersRepository,
    })

    const transaction = await transactionOrderCreateService.execute({
      token,
      issuer_id,
      payment_method_id,
      installments,
      description,
      payer,
      dishs,
      user_id,
    })


    return res.status(201).json(transaction)
  }
}

module.exports = TransactionsControllers
