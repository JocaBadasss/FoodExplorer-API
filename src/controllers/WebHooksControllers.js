const { sendEventToClients } = require("../utils/sse")

class WebHooksControllers {
  async create(req, res) {
    try {
      const response = req.body

      sendEventToClients(response)

      res.status(200).send("Webhook processado com sucesso")
    } catch (error) {
      console.error("Erro no tratamento do webhook:", error)
      res.status(500).send("Erro interno no servidor")
    }
  }
}

module.exports = WebHooksControllers
