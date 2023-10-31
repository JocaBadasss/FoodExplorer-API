const { sendSseData } = require("../routes/sse.routes")

class WebHooksControllers {
  async create(req, res) {
    const response = req.body

    console.log("payload do mercado pago", response)

    sendSseData(response)

    res.status(200)
  }
}

module.exports = WebHooksControllers
