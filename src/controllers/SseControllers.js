const { clients, sendEventToClients } = require("../utils/sse")

class SseControllers {
  async create(req, res) {
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")
    res.flushHeaders()

    clients.add(res)

    req.on("close", () => {
      clients.delete(res)
    })
  }
}

module.exports = SseControllers
