const { Router } = require("express")
const Order_testeController = require("../controllers/Order_testeController")

const order_testeController = new Order_testeController()
const order_testeRoutes = Router()

order_testeRoutes.post("/", order_testeController.create)
order_testeRoutes.get("/", order_testeController.index)

module.exports = order_testeRoutes
