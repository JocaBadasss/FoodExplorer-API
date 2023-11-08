const AppError = require("../../utils/AppError")

class DishesShowService {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository
  }

  async execute({ dish_id }) {
    try {
      const dish = await this.dishesRepository.findDishAndTagsByDishId({
        dish_id,
      })

      return dish
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

module.exports = DishesShowService
