const { Router } = require("express")
const DishesControllers = require("../controllers/DishesControllers")
const DishesImageControllers = require("../controllers/DishesImageControllers")
const ensureIsAdmin = require("../middlewares/ensureIsAdmin")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const dishesRouter = Router()
const dishesControllers = new DishesControllers()
const dishesImageControllers = new DishesImageControllers()

const upload = multer(uploadConfig.MULTER)

dishesRouter.post("/", ensureIsAdmin, dishesControllers.create)
dishesRouter.patch(
  "/image/:dish_id",
  ensureIsAdmin,
  upload.single("image"),
  dishesImageControllers.update
)

module.exports = dishesRouter
