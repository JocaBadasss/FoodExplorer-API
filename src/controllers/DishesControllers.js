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

    return res.json(dish_id).status(200)
  }

  async update(req, res) {
    const { id, name, category, description, price_cents, tags } = req.body
    const user_id = req.user.id

    const dishesRepository = new DishesRepository()
    const dishesUpdateService = new DishesUpdateService(dishesRepository)

    const updatedDish = await dishesUpdateService.execute({
      id,
      name,
      category,
      description,
      price_cents,
      tags,
      user_id,
    })

    return res.json(updatedDish).status(200)
  }

  async show(req, res) {
    const { dish_id } = req.params

    const dishesRepository = new DishesRepository()
    const dishesShowService = new DishesShowService(dishesRepository)

    const dish = await dishesShowService.execute(dish_id)

    return res.json(dish).status(200)
  }

  async index(req, res) {
    const dishesRepository = new DishesRepository()
    const dishesIndexService = new DishesIndexService(dishesRepository)

    const dishes = await dishesIndexService.execute()

    return res.json(dishes).status(200)
  }
}

module.exports = DishesControllers
