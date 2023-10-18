const { MercadoPagoConfig, Payment } = require("mercadopago")
const AppError = require("../utils/AppError")

class TransactionsControllers {
  async create(req, res) {
    const { transaction_amount, description, payment_method_id, payer } =
      req.body

    try {
      const client = new MercadoPagoConfig({
        accessToken:
          "TEST-6327083022181219-101711-dd2668ed2e51ae3dc9dffba0b8ea910a-1129134736",
      })
      const payment = new Payment(client)

      const body = {
        transaction_amount,
        description,
        payment_method_id,
        payer,
      }

      const response = await payment
        .create({ body })
        .then(console.log)
        .catch(console.log)

      res.json(response)
    } catch (error) {
      const appError = new AppError(error.message, 400)

      res.status(appError.statusCode).json(appError)
    }
  }
}

module.exports = TransactionsControllers

