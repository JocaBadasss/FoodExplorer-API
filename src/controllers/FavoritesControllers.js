const FavoritesRepository = require("../repositories/FavoritesRepository")
const FavoritesCreateService = require("../services/FavoritesCreateService")
const FavoritesIndexService = require("../services/FavoritesIndexService")
const FavoritesDeleteService = require("../services/FavoritesDeleteService")

class FavoritesControllers {
  async create(req, res) {
    const { dish_id } = req.params
    const user_id = req.user.id

    const favoritesRepository = new FavoritesRepository()
    const favoritesCreateService = new FavoritesCreateService(
      favoritesRepository
    )

    await favoritesCreateService.execute({
      user_id,
      dish_id,
    })

    return res.json()
  }

  async delete(req, res) {
    const { dish_id } = req.params
    const user_id = req.user.id

    const favoritesRepository = new FavoritesRepository()
    const favoritesDeleteService = new FavoritesDeleteService(
      favoritesRepository
    )

    await favoritesDeleteService.execute({
      user_id,
      dish_id,
    })

    return res.json()
  }

  async index(req, res) {
    const user_id = req.user.id

    const favoritesRepository = new FavoritesRepository()
    const favoritesIndexService = new FavoritesIndexService(favoritesRepository)

    const favorites = await favoritesIndexService.execute(user_id)

    return res.json(favorites)
  }
}

module.exports = FavoritesControllers
