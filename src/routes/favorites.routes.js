const { Router } = require("express")
const FavoritesControllers = require("../controllers/FavoritesControllers")

const ensureIsAutheticated = require("../middlewares/ensureIsAutheticated")

const favoritesControllers = new FavoritesControllers()

const favoritesRouter = Router()
favoritesRouter.use(ensureIsAutheticated)

favoritesRouter.post("/:dish_id", favoritesControllers.create)
favoritesRouter.delete("/:dish_id", favoritesControllers.delete)
favoritesRouter.get("/", favoritesControllers.index)

module.exports = favoritesRouter
