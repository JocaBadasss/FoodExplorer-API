const { Router } = require("express")

const adminRouter = require("./admins.routes")
const usersRouter = require("./users.routes")
const sessionsRouter = require("./sessions.routes")
const dishesRouter = require("./dishes.routes")
const favoritesRoutes = require("./favorites.routes")
const transactionsRoutes = require("./transactions.routes")
const order_testeRoutes = require("./order_teste.routes")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/admin", adminRouter)
routes.use("/dishes", dishesRouter)
routes.use("/favorites", favoritesRoutes)
routes.use("/transactions", transactionsRoutes)
routes.use("/order_teste", order_testeRoutes)

module.exports = routes
