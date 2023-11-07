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

    // const ordersRepository = new OrdersRepository()
    // const ordersCreateService = new OrdersCreateService(ordersRepository)
    // const ordersUpdateService = new OrdersUpdateService(ordersRepository)

    // const order_id = await ordersCreateService.execute({
    //   dishs_ids: dishs,
    //   user_id,
    // })

    // const transactionsRepository = new TransactionsRepository()
    // const transactionsCreateService = new TransactionsCreateService(
    //   transactionsRepository
    // )

    // const transaction = await transactionsCreateService.execute({
    //   token,
    //   issuer_id,
    //   payment_method_id,
    //   installments,
    //   description,
    //   payer,
    //   dishs,
    // })

    // if (transaction.status === "aproved") {
    //   await ordersUpdateService.execute({
    //     order_id,
    //     status: "Preparando",
    //   })
    // }

    // if (transaction.status === "rejected") {
    //   await ordersUpdateService.execute({
    //     order_id,
    //     status: "Pagamento recusado",
    //   })
    // }

    const ordersRepository = new OrdersRepository()
    const transactionsRepository = new TransactionsRepository()

    const transactionOrderCreateService = TransactionOrderCreateService({
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

    return res.json(transaction)
  }
}

module.exports = TransactionsControllers
