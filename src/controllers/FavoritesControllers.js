const FavoritesRepository = require("../repositories/FavoritesRepository")
const FavoritesCreateService = require("../services/FavoriteServices/FavoritesCreateService")
const FavoritesIndexService = require("../services/FavoriteServices/FavoritesIndexService")
const FavoritesDeleteService = require("../services/FavoriteServices/FavoritesDeleteService")
const FavoritesShowService = require("../services/FavoriteServices/FavoritesShowService")

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

  async show(req, res) {
    const { dish_id } = req.params
    const user_id = req.user.id

    const favoritesRepository = new FavoritesRepository()
    const favoritesShowService = new FavoritesShowService(favoritesRepository)

    const dishId = await favoritesShowService.execute({
      user_id,
      dish_id,
    })

    return res.json(dishId)
  }

  async index(req, res) {
    const user_id = req.user.id

    const favoritesRepository = new FavoritesRepository()
    const favoritesIndexService = new FavoritesIndexService(favoritesRepository)

    const favorites = await favoritesIndexService.execute(user_id)

    return res.json(favorites)
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
}

module.exports = FavoritesControllers
