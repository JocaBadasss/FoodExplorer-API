const { Router } = require("express")

const adminRouter = require("./admins.routes")
const usersRouter = require("./users.routes")
const sessionsRouter = require("./sessions.routes")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/admin", adminRouter)

module.exports = routes
