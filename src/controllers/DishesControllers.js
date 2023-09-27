const DishesCreateService = require("../services/DishesCreateService")
const DishesIndexService = require("../services/DishesIndexService")

const DishesRepository = require("../repositories/DishesRepository")

class DishesControllers {
  async create(req, res) {
    const { name, category, description, price, tags } = req.body

    const user_id = req.user.id

    const dishesRepository = new DishesRepository()
    const dishesCreateService = new DishesCreateService(dishesRepository)

    const dish_id = await dishesCreateService.execute({
      name,
      category,
      description,
      price,
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
}

module.exports = DishesControllers
