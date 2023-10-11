class FavoritesDeleteService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository
  }

  async execute({ user_id, dish_id }) {
    await this.favoritesRepository.delete({ user_id, dish_id })

    return
  }
}

module.exports = FavoritesDeleteService
