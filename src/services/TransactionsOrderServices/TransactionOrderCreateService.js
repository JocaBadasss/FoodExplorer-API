const AppError = require("../../utils/AppError")
const TransactionsCreateServiceValidationSchema = require("../../schemas/TransactionsValidations/TransactionsCreateServiceValidation")
const TransactionsCreateService = require("../TransactionsServices/TransactionsCreateService")
const OrdersCreateService = require("../OrdersServices/OrdersCreateService")
const OrdersUpdateService = require("../OrdersServices/OrdersUpdateService")

class TransactionOrderCreateService {
  constructor({ transactionsRepository, ordersRepository }) {
    this.transactionsRepository = transactionsRepository
    this.ordersRepository = ordersRepository
  }

  async execute({
    token,
    issuer_id,
    payment_method_id,
    installments,
    description,
    payer,
    dishs,
    user_id,
  }) {
    try {
      await TransactionsCreateServiceValidationSchema.validate(
        {
          token,
          issuer_id,
          payment_method_id,
          installments,
          description,
          payer,
          dishs,
        },
        { abortEarly: false }
      )
    } catch (error) {
      console.log("aqui validate")
      const formattedErrors = error.inner.map((err) => err.message).join(", ")
      throw new AppError(`Erro de validação: ${formattedErrors}`, 400)
    }

    try {
      const ordersCreateService = new OrdersCreateService(this.ordersRepository)
      const ordersUpdateService = new OrdersUpdateService(this.ordersRepository)
      const transactionsCreateService = new TransactionsCreateService(
        this.transactionsRepository
      )

      const order_id = await ordersCreateService.execute({
        dishs_ids: dishs,
        user_id,
      })

      const transaction = await transactionsCreateService.execute({
        token,
        issuer_id,
        payment_method_id,
        installments,
        description,
        payer,
        dishs,
      })

      if (transaction.status === "aproved") {
        await ordersUpdateService.execute({
          order_id,
          status: "Preparando",
        })
      }

      if (transaction.status === "rejected") {
        await ordersUpdateService.execute({
          order_id,
          status: "Pagamento recusado",
        })
      }

      return { ...transaction, order_id }
    } catch (error) {
      throw new AppError("Erro ao criar transação", 400)
    }
  }
}
module.exports = TransactionOrderCreateService
