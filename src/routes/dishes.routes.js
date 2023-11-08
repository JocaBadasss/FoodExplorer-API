const { Router } = require("express")
const DishesControllers = require("../controllers/DishesControllers")
const ensureIsAdmin = require("../middlewares/ensureIsAdmin")

const dishesRouter = Router()
const dishesControllers = new DishesControllers()

dishesRouter.post("/", ensureIsAdmin, dishesControllers.create)
dishesRouter.get("/", dishesControllers.index)
dishesRouter.get("/:dish_id", dishesControllers.show)
dishesRouter.patch("/", ensureIsAdmin, dishesControllers.update)
dishesRouter.delete("/:dish_id", ensureIsAdmin, dishesControllers.delete)

module.exports = dishesRouter
