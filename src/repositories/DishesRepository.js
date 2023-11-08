const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")

class DishesRepository {
  async verifyIfDishNameAlreadyExists(name) {
    const dish = await knex("dishes").select("*").where("name", name)

    return dish
  }
  async createDish({ name, category, description, price_cents, user_id }) {
    const [dish_id] = await knex("dishes").insert({
      name,
      category,
      description,
      price_cents,
      user_id,
    })

    return dish_id
  }

  async createTags(tagsToInsert) {
    await knex("dishes_tags").insert(tagsToInsert)

    return
  }

  async updateDish({ name, category, description, price_cents, dish_id }) {
    await knex("dishes")
      .update({
        name,
        category,
        description,
        price_cents,
      })
      .where("id", dish_id)

    return
  }

  async updateTags({ tagsToInsert, dish_id, user_id }) {
    await knex("dishes_tags").where({ dish_id, user_id }).delete()

    await knex("dishes_tags").insert(tagsToInsert)

    return
  }

  async findDishByDishId(dish_id) {
    const dish = await knex("dishes").select("*").where("id", dish_id).first()

    return dish
  }

  async findUpdatedDishAndTagsById(dish_id) {
    const dish = await knex("dishes as d")
      .select(
        "d.id",
        "d.name",
        "d.category",
        "d.description",
        "d.price_cents",
        "t.name as tag",
        "t.id as tag_id"
      )
      .leftJoin("dishes_tags as t", "d.id", "t.dish_id")
      .where("d.id", dish_id)

    return dish
  }

  async findDishAndTagsByDishId({ dish_id }) {
    const dish = await knex("dishes").select("*").where({ id: dish_id }).first()
    const tags = await knex("dishes_tags")
      .select("*")
      .where({ dish_id })
      .orderBy("name")

    return { ...dish, tags }
  }

  async indexAllDishes() {
    const dishes = await knex("dishes").select("*")

    return dishes
  }

  async indexByQuery(query) {
    const dishes = await knex("dishes as d")
      .select("d.*")
      .leftJoin("dishes_tags as t", "d.id", "t.dish_id")
      .whereLike("d.name", `%${query}%`)
      .orWhereLike("d.category", `%${query}%`)
      .orWhereLike("d.description", `%${query}%`)
      .orWhereLike("t.name", `%${query}%`)
      .first()

    return dishes
  }

  async deleteDish(dish_id) {
    const isDeleted = await knex("dishes").where({ id: dish_id }).delete()

    return isDeleted
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

  async indexFilteredDishes({ name, category, description, tags }) {
    //quero fazer uma busca por nome, categoria, descrição e tags, que retorne todos os pratos que satisfazem as condições

    const dishes = await knex("dishes")
      .select("*")
      .whereLike("name", `%${name}%`)
      .orWhereLike("category", `%${category}%`)
      .orWhereLike("description", `%${description}%`)
  }

  async deleteDishImage(dish) {
    const diskStorage = new DiskStorage()
    await diskStorage.deleteFile(dish.image)
  }
}

module.exports = DishesRepository
