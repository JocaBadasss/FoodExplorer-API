const AppError = require("../../utils/AppError")
const TransactionsCreateServiceValidationSchema = require("../../schemas/TransactionsValidations/TransactionsCreateServiceValidation")

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
      const formattedErrors = error.inner.map((err) => err.message).join(", ")
      throw new AppError(`Erro de validação: ${formattedErrors}`, 400)
    }

    try {
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

      const response = await this.TransactionsRepository.createTransaction(
        paymentData
      )

      return response
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

module.exports = TransactionsCreateService
