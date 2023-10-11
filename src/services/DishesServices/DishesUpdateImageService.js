const AppError = require("../../utils/AppError")
const DiskStorage = require("../../providers/DiskStorage")

class DishesUpdateImageService {
  constructor(DishesRepository) {
    this.DishesRepository = DishesRepository
  }

  async execute({ dish_id, imageFileName }) {
    const dish = this.DishesRepository.findDishByDishId(dish_id)

    if (!dish) {
      throw new AppError("Dish not found")
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
  }
}

module.exports = DishesUpdateImageService
