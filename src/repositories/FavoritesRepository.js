const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class FavoritesRepository {
  async create({ user_id, dish_id }) {
    const checkIfDishAlreadyFavorited = await knex("favorites")
      .where({ user_id, dish_id })
      .first()
    if (checkIfDishAlreadyFavorited) {
      throw new AppError("Dish already exists")
    } else {
      await knex("favorites").insert({ user_id, dish_id })
    }

    return
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

    return
  }

  async find(user_id) {
    const favorites = await knex("favorites")
      .select("dish_id")
      .where({ user_id })

    return favorites
  }
}

module.exports = FavoritesRepository
