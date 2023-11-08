const { Router } = require("express")

const adminRouter = require("./admins.routes")
const usersRouter = require("./users.routes")
const sessionsRouter = require("./sessions.routes")
const dishesRouter = require("./dishes.routes")
const favoritesRoutes = require("./favorites.routes")
const transactionsRoutes = require("./transactions.routes")
const ordersRoutes = require("./orders.routes")
const webHooksRoutes = require("./webhooks.routes")
const sseRoutes = require("./sse.routes")
const dishesImageRoutes = require("./dishesImages.routes")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/admin", adminRouter)
routes.use("/dishes", dishesRouter)
routes.use("/favorites", favoritesRoutes)
routes.use("/transactions", transactionsRoutes)
routes.use("/orders", ordersRoutes)
routes.use("/webhooks", webHooksRoutes)
routes.use("/sse", sseRoutes)
routes.use("/dishes/image", dishesImageRoutes)

module.exports = routes
