const AppError = require("../../utils/AppError")

class FavoritesRepositoryInMemory {
  favorites = [
    {
      id: 1,
      user_id: 1,
      dish_id: 1,
    },
  ]
  async create({ user_id, dish_id }) {
    const checkIfDishAlreadyExists = this.favorites.find(
      (favorite) => favorite.user_id === user_id && favorite.dish_id === dish_id
    )

    if (checkIfDishAlreadyExists) {
      throw new AppError("Dish already favorited")
    }

    this.favorites.push({
      id: this.favorites.length + 1,
      user_id,
      dish_id,
    })

    return this.favorites
  }

  async delete({ user_id, dish_id }) {
    const checkIfDishAlreadyExists = this.favorites.find(
      (favorite) => favorite.user_id === user_id && favorite.dish_id === dish_id
    )

    if (!checkIfDishAlreadyExists) {
      throw new AppError("Dish not found")
    }

    this.favorites = this.favorites.filter(
      (favorite) =>
        !(favorite.user_id === user_id && favorite.dish_id === dish_id)
    )

    return this.favorites
  }

  async findAll(user_id) {
    const favorites = this.favorites.filter(
      (favorite) => favorite.user_id === user_id
    )


    return favorites
  }

  async findByDishId({ user_id, dish_id }) {
    const favorites = this.favorites.find(
      (favorite) => favorite.user_id === user_id && favorite.dish_id === dish_id
    )

    return favorites
  }
}

module.exports = FavoritesRepositoryInMemory
