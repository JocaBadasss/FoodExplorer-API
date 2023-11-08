const { Router } = require("express")
const DishesImageControllers = require("../controllers/DishesImageControllers")
const ensureIsAdmin = require("../middlewares/ensureIsAdmin")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const dishesImagesRouter = Router()
const dishesImageControllers = new DishesImageControllers()

const upload = multer(uploadConfig.MULTER)

dishesImagesRouter.patch(
  "/:dish_id",
  ensureIsAdmin,
  upload.single("image"),
  dishesImageControllers.update
)

module.exports = dishesImagesRouter
