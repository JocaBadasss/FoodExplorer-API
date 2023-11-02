const { Router } = require("express")
const WebHooksControllers = require("../controllers/WebHooksControllers")

const webHooksRouter = Router()
const webHooksControllers = new WebHooksControllers()

webHooksRouter.post("/", webHooksControllers.create)

module.exports = webHooksRouter
