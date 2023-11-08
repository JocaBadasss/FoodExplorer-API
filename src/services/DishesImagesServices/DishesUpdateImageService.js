const AppError = require("../../utils/AppError")

class DishesUpdateImageService {
  constructor(DishesRepository) {
    this.DishesRepository = DishesRepository
  }

  async execute({ dish_id, imageFileName }) {
    try {
      const dish = await this.DishesRepository.findDishByDishId(dish_id)

      if (!dish) {
        throw new AppError("Dish not found", 404)
      }

      if (dish.image) {
        await this.DishesRepository.deleteDishImage(dish.image)
      }

      const updatedDish = await this.DishesRepository.updateDishImage({
        dish,
        imageFileName,
        dish_id,
      })

      return updatedDish
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

module.exports = DishesUpdateImageService
