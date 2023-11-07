class FavoritesShowService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository
  }

  async execute({ user_id, dish_id }) {
    const dishId = await this.favoritesRepository.findByDishId({
      user_id,
      dish_id,
    })

    return dishId
  }
}

module.exports = FavoritesShowService
