const OrdersShowService = require("../services/OrdersServices/OrdersShowService")
const OrdersIndexService = require("../services/OrdersServices/OrdersIndexService")
const OrdersRepository = require("../repositories/OrdersRepository")

class OrdersControllers {
  async show(req, res) {
    const user_id = req.user.id
    const status = req.query.status

    const ordersRepository = new OrdersRepository()
    const ordersShowService = new OrdersShowService(ordersRepository)

    const orders = await ordersShowService.execute({ user_id }, status)

    return res.json(orders)
  }

  async index(req, res) {
    const status = req.query.status

    const ordersRepository = new OrdersRepository()
    const ordersIndexService = new OrdersIndexService(ordersRepository)

    const orders = await ordersIndexService.execute(status)

    return res.json(orders)
  }
}

module.exports = OrdersControllers
