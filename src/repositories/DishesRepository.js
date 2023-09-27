const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")

class DishesRepository {
  async createDish({ name, category, description, price, user_id }) {
    const [dish_id] = await knex("dishes").insert({
      name,
      category,
      description,
      price,
      user_id,
    })

    return dish_id
  }

  async createTags(tagsToInsert) {
    await knex("dishes_tags").insert(tagsToInsert)
  }

  async findDishByDishId(dish_id) {
    const dish = await knex("dishes").select("*").where("id", dish_id).first()

    return dish
  }

  async updateDishImage({ dish, imageFileName, dish_id }) {
    const diskStorage = new DiskStorage()

    const filename = await diskStorage.saveFile(imageFileName)
    dish.image = filename

    await knex("dishes").update(dish).where("id", dish_id)

    const updatedDish = await knex("dishes")
      .select("*")
      .where("id", dish_id)
      .first()

    return updatedDish
  }

  async deleteDishImage(dish) {
    const diskStorage = new DiskStorage()
    await diskStorage.deleteFile(dish.image)
  }

  async indexAllDishes() {
    const dishes = await knex("dishes").select("*")

    return dishes
  }
}

module.exports = DishesRepository
