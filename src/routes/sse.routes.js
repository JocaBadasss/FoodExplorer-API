const { Router } = require("express")
const SSE = require("express-sse")
const SseControllers = require("../controllers/sseControllers")

const sse = new SSE()
const sseRouter = Router()

function sendSseData(data) {
  sse.send(data)
}

sseRouter.get("/", sse.init)

module.exports = sseRouter
