const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class FavoritesRepository {
  async create({ user_id, dish_id }) {
    const checkIfDishAlreadyFavorited = await knex("favorites")
      .where({ user_id, dish_id })
      .first()
    if (checkIfDishAlreadyFavorited) {
      throw new AppError("Dish already favorited")
    }
    const result = await knex("favorites").insert({ user_id, dish_id })

    return result
  }

  async delete({ user_id, dish_id }) {
    const checkIfDishAlreadyExists = await knex("favorites").where({
      user_id,
      dish_id,
    })

    if (!checkIfDishAlreadyExists) {
      throw new AppError("Dish not found")
    }

    await knex("favorites").where({ user_id, dish_id }).delete()

    const result = await knex("favorites").where({ user_id, dish_id })

    return result
  }

  async findAll(user_id) {
    const favorites = await knex("favorites")
      .select("dish_id")
      .where({ user_id })

    const dishes = []

    for (const favorite of favorites) {
      const dish = await knex("dishes")
        .select("name", "image", "id")
        .where("id", favorite.dish_id)
        .first()

      dishes.push(dish)
    }

    return dishes
  }

  async findByDishId({ user_id, dish_id }) {
    const favorites = await knex("favorites")
      .select("dish_id")
      .where({ user_id, dish_id })

    return favorites
  }
}

module.exports = FavoritesRepository
