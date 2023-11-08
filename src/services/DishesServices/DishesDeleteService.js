const AppError = require("../../utils/AppError")

class DishesDeleteService {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository
  }

  async execute(dish_id) {
    try {
      const findDishByDishId = await this.dishesRepository.findDishByDishId(
        dish_id
      )

      if (!findDishByDishId) {
        throw new AppError("Prato não encontrado", 404)
      }

      const isDeleted = await this.dishesRepository.deleteDish(dish_id)

      return isDeleted
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

module.exports = DishesDeleteService
