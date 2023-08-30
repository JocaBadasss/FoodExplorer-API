const DishesCreateServices = require("../services/DishesCreateService")
const DishesRepository = require("../repositories/DishesRepository")

class DishesControllers {
  async create(req, res) {
    const { name, category, description, price, tags } = req.body

    const user_id = req.user.id

    const dishesRepository = new DishesRepository()
    const dishesCreateServices = new DishesCreateServices(dishesRepository)

    const dish_id = await dishesCreateServices.execute({
      name,
      category,
      description,
      price,
      user_id,
      tags,
    })

    return res.json(dish_id)
  }
}

module.exports = DishesControllers
