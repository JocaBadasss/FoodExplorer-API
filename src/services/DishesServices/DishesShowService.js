class DishesShowService {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository
  }

  async execute(id) {
    const dish = await this.dishesRepository.findDishAndTagsByDishId(id)

    return dish
  }
}

module.exports = DishesShowService
