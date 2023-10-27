const {Router} = require("express")
const WebHooksControllers = require("../controllers/WebHooksControllers")

const webHooksControllers = new WebHooksControllers()

const webHooksRouter = Router()

webHooksRouter.post("/success", webHooksControllers.create)

module.exports = webHooksRouter