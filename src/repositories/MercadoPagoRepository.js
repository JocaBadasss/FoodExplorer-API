const { MercadoPagoConfig, Payment } = require("mercadopago")
const AppError = require("../utils/AppError")

class MercadoPagoRepository {
  async createPayment(paymentData) {
    try {
      const client = new MercadoPagoConfig({
        accessToken:
          "TEST-6327083022181219-101711-dd2668ed2e51ae3dc9dffba0b8ea910a-1129134736",
      })
      const payment = new Payment(client)

      const response = await payment
        .create({ body: paymentData })
        .then((response) => {
          return response
        })
        .catch((err) => {
          throw new AppError(err)
        })

      return response
    } catch (error) {
      throw new AppError(error.message.message)
    }
  }
}

module.exports = MercadoPagoRepository
