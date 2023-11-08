const AppError = require("../../utils/AppError")

class FavoritesShowService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository
  }

  async execute({ user_id, dish_id }) {
    try {
      const dishId = await this.favoritesRepository.findByDishId({
        user_id,
        dish_id,
      })

      return dishId
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

module.exports = FavoritesShowService
