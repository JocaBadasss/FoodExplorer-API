const DishesRepository = require("../repositories/DishesRepository")
const DishesUpdateImageService = require("../services/DishesImagesServices/DishesUpdateImageService")

class DishesImageControllers {
  async update(req, res) {
    const { dish_id } = req.params
    const imageFileName = req.file.filename
    const dishesRepository = new DishesRepository()
    const dishesUpdateImageService = new DishesUpdateImageService(
      dishesRepository
    )

    const dish = await dishesUpdateImageService.execute({
      imageFileName,
      dish_id,
    })

    return res.status(201).json(dish)
  }
}

module.exports = DishesImageControllers
