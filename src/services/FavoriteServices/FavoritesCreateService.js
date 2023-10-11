class FavoritesCreateService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository
  }

  async execute({ user_id, dish_id }) {
    await this.favoritesRepository.create({ user_id, dish_id })

    return
  }
}

module.exports = FavoritesCreateService