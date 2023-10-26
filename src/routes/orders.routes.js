const { Router } = require("express")
const OrdersControllers = require("../controllers/OrdersControllers")
const ensureIsAutheticated = require("../middlewares/ensureIsAutheticated")
const ensureIsAdmin = require("../middlewares/ensureIsAdmin")

const ordersControllers = new OrdersControllers()
const ordersRouter = Router()

ordersRouter.get("/", ensureIsAutheticated, ordersControllers.show)
ordersRouter.get("/admin", ensureIsAdmin, ordersControllers.index)

module.exports = ordersRouter
