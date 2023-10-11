class DishesCreateServices {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository
  }

  async execute({ name, category, description, price_cents, tags, user_id }) {
    const dish_id = await this.dishesRepository.createDish({
      name,
      category,
      description,
      price_cents,
      user_id,
    })

    const tagsToInsert = tags.map((tag) => {
      return {
        name: tag,
        dish_id,
        user_id,
      }
    })

    await this.dishesRepository.createTags(tagsToInsert)

    return dish_id
  }
}

module.exports = DishesCreateServices
