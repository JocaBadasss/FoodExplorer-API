const AppError = require("../../utils/AppError")

class FavoritesCreateService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository
  }

  async execute({ user_id, dish_id }) {
    try {
      const favoritedDish = await this.favoritesRepository.create({
        user_id,
        dish_id,
      })

      return favoritedDish
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

module.exports = FavoritesCreateService
