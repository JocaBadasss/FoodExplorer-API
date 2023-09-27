class FavoritesIndexService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository
  }

  async execute(user_id) {
    const favorites = await this.favoritesRepository.find(user_id)

    return favorites
  }
}

module.exports = FavoritesIndexService
