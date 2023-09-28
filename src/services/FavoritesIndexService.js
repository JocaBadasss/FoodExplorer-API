class FavoritesIndexService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository
  }

  async execute(user_id) {
    const favorites = await this.favoritesRepository.findAll(user_id)

    return favorites
  }
}

module.exports = FavoritesIndexService
