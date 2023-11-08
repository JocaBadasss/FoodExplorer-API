const DishesCreateService = require("../services/DishesServices/DishesCreateService")
const DishesIndexService = require("../services/DishesServices/DishesIndexService")
const DishesShowService = require("../services/DishesServices/DishesShowService")
const DishesUpdateService = require("../services/DishesServices/DishesUpdateService")
const DishesDeleteService = require("../services/DishesServices/DishesDeleteService")

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

    return res.status(201).json(dish_id)
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

    return res.status(201).json(updatedDish)
  }

  async show(req, res) {
    const { dish_id } = req.params

    const dishesRepository = new DishesRepository()
    const dishesShowService = new DishesShowService(dishesRepository)

    const dish = await dishesShowService.execute({ dish_id })

    return res.status(201).json(dish)
  }

  async index(req, res) {
    const { query } = req.query

    const dishesRepository = new DishesRepository()
    const dishesIndexService = new DishesIndexService(dishesRepository)

    const dishes = await dishesIndexService.execute(query)

    return res.status(201).json(dishes)
  }

  async delete(req, res) {
    const { dish_id } = req.params

    const dishesRepository = new DishesRepository()
    const dishesDeleteService = new DishesDeleteService(dishesRepository)

    const isDeleted = await dishesDeleteService.execute(dish_id)

    return res.status(201).json({ isDeleted })
  }
}

module.exports = DishesControllers
