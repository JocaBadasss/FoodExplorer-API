const { Router } = require("express")
const SseControllers = require("../controllers/SseControllers")

const sseControllers = new SseControllers()

const sseRouter = Router()

sseRouter.get("/", sseControllers.create)

module.exports = sseRouter
