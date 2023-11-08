const AppError = require("../../utils/AppError")

class FavoritesDeleteService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository
  }

  async execute({ user_id, dish_id }) {
    try {
      await this.favoritesRepository.delete({ user_id, dish_id })

      return
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

module.exports = FavoritesDeleteService
