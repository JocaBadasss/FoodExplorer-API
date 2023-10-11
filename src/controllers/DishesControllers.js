const DishesCreateService = require("../services/DishesServices/DishesCreateService")
const DishesIndexService = require("../services/DishesServices/DishesIndexService")
const DishesShowService = require("../services/DishesServices/DishesShowService")

const DishesRepository = require("../repositories/DishesRepository")

class DishesControllers {
  async create(req, res) {
    const { name, category, description, price_cents, tags } = req.body

    const user_id = req.user.id

    const dishesRepository = new DishesRepository()
    const dishesCreateService = new DishesCreateService(dishesRepository)

    const dish_id = await dishesCreateService.execute({
      name,
      category,
      description,
      price_cents,
      user_id,
      tags,
    })

    return res.json(dish_id)
  }

  async index(req, res) {
    const dishesRepository = new DishesRepository()
    const dishesIndexService = new DishesIndexService(dishesRepository)

    const dishes = await dishesIndexService.execute()

    return res.json(dishes)
  }

  async show(req, res) {
    const { dish_id } = req.params

    const dishesRepository = new DishesRepository()
    const dishesShowService = new DishesShowService(dishesRepository)

    const dish = await dishesShowService.execute(dish_id)

    return res.json(dish)
  }
}

module.exports = DishesControllers
