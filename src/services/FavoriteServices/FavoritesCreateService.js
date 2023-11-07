class FavoritesCreateService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository
  }

  async execute({ user_id, dish_id }) {
    const favoritedDish = await this.favoritesRepository.create({
      user_id,
      dish_id,
    })

    return favoritedDish
  }
}

module.exports = FavoritesCreateService
