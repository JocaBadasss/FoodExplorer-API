const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")

class DishesRepository {
  async createDish({ name, category, description, price_cents, user_id }) {
    const newPrice = Number(price_cents.replace(",", ".") * 100)

    const [dish_id] = await knex("dishes").insert({
      name,
      category,
      description,
      price_cents: newPrice,
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

  async findDishAndTagsByDishId(dish_id) {
    const dish = await knex("dishes").select("*").where("id", dish_id).first()
    const tags = await knex("dishes_tags")
      .select("*")
      .where({ dish_id })
      .orderBy("name")

    console.log(tags)
    console.log(dish)

    return { ...dish, tags }
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
