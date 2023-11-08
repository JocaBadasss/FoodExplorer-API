const AppError = require("../../utils/AppError")

class DishesIndexServices {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository
  }

  async execute(query) {
    try {
      if (!query) {
        const dishes = await this.dishesRepository.indexAllDishes()

        return dishes
      }

      if (query) {
        const dishes = await this.dishesRepository.indexByQuery(query)

        return dishes
      }

      return dishes
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

module.exports = DishesIndexServices
