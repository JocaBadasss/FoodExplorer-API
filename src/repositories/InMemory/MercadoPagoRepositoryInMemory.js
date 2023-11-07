const AppError = require("../../utils/AppError")

class MercadoPagoRepositoryInMemory {
  async createPayment(paymentData) {
    try {
      if (paymentData.payer.first_name === "APRO") {
        const response = {
          id: Math.floor(Math.random() * 1000) + 1,
          date_created: new Date(),
          date_aproved: new Date(),
          description: paymentData.description,
          transaction_amount: paymentData.transaction_amount,
          payment_method_id: paymentData.payment_method_id,
          payer: {
            first_name: paymentData.payer.first_name,
            email: paymentData.payer.email,
            identification: {
              type: paymentData.payer.identification.type,
              number: paymentData.payer.identification.number,
            },
          },
          status: "approved",
        }

        return response
      }

      if (paymentData.payer.first_name === "OTHE") {
        const response = {
          id: Math.floor(Math.random() * 1000) + 1,
          date_created: new Date(),
          date_aproved: new Date(),
          description: paymentData.description,
          transaction_amount: paymentData.transaction_amount,
          payment_method_id: paymentData.payment_method_id,
          payer: {
            first_name: paymentData.payer.first_name,
            email: paymentData.payer.email,
            identification: {
              type: paymentData.payer.identification.type,
              number: paymentData.payer.identification.number,
            },
          },
          status: "rejected",
        }

        return response
      }
    } catch (error) {
      throw new AppError("Erro interno no servidor")
    }
  }
}

module.exports = MercadoPagoRepositoryInMemory
