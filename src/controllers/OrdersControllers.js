const OrdersShowService = require("../services/OrdersServices/OrdersShowService")
const OrdersIndexService = require("../services/OrdersServices/OrdersIndexService")
const OrdersRepository = require("../repositories/OrdersRepository")
const OrdersUpdateService = require("../services/OrdersServices/OrdersUpdateService")

class OrdersControllers {
  async show(req, res) {
    const user_id = req.user.id
    const status = req.query.status

    const ordersRepository = new OrdersRepository()
    const ordersShowService = new OrdersShowService(ordersRepository)

    const orders = await ordersShowService.execute({ user_id }, status)

    return res.status(201).json(orders)
  }

  async index(req, res) {
    const status = req.query.status

    const ordersRepository = new OrdersRepository()
    const ordersIndexService = new OrdersIndexService(ordersRepository)

    const orders = await ordersIndexService.execute(status)

    return res.status(201).json(orders)
  }

  async update(req, res) {
    const { order_id, status } = req.body

    const ordersRepository = new OrdersRepository()
    const ordersUpdateService = new OrdersUpdateService(ordersRepository)

    await ordersUpdateService.execute({ order_id, status })

    return res.status(201).json()
  }
}

module.exports = OrdersControllers
