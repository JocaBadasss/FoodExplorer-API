class DishesIndexServices {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository
  }

  async execute() {
    const dishes = await this.dishesRepository.indexAllDishes()

    return dishes
  }
}

module.exports = DishesIndexServices
