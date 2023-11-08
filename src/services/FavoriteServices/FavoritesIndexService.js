const AppError = require("../../utils/AppError")

class FavoritesIndexService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository
  }

  async execute(user_id) {
    try {
      const favorites = await this.favoritesRepository.findAll(user_id)

      return favorites
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

module.exports = FavoritesIndexService
