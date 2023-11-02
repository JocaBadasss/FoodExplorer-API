class DishesRepository {
  dishes = [
    {
      id: 1,
      name: "Prugna Pie",
      category: "Sobremesas",
      description:
        "Torta de ameixa com massa amanteigada, polvilho em cachacça.",
      price_cents: 7997,
      tags: ["alface", "cebola", "pão naan", "pepino", "rabanete", "tomate"],
    },
  ]
  nextId = 1
  dishes_tags = [
    {
      id: 1,
      name: "alface",
      dish_id: 1,
      user_id: 1,
    },
    {
      id: 2,
      name: "cebola",
      dish_id: 1,
      user_id: 1,
    },
    {
      id: 3,
      name: "pão naan",
      dish_id: 1,
      user_id: 1,
    },
    {
      id: 4,
      name: "pepino",
      dish_id: 1,
      user_id: 1,
    },
    {
      id: 5,
      name: "rabanete",
      dish_id: 1,
      user_id: 1,
    },
    {
      id: 6,
      name: "tomate",
      dish_id: 1,
      user_id: 1,
    },
  ]

  async verifyIfDishNameAlreadyExists(name) {
    const dish = this.dishes.find((dish) => dish.name === name)

    return dish
  }
  async createDish({ name, category, description, price_cents, user_id }) {
    const dish_id = this.nextId++

    const dish = {
      id: dish_id,
      name,
      category,
      description,
      price_cents,
      user_id,
    }

    this.dishes.push(dish)

    return dish_id
  }

  async createTags(tagsToInsert) {
    this.dishes_tags.push(...tagsToInsert)
  }

  async updateDish({ name, category, description, price_cents, id }) {
    const updatedDish = this.dishes.find((dish) => dish.id === id)

    updatedDish.name = name
    updatedDish.category = category
    updatedDish.description = description
    updatedDish.price_cents = price_cents

    return 
  }

  async updateTags({ tagsToInsert, dish_id, user_id }) {
    const tagsToDelete = this.dishes_tags.filter(
      (tag) => tag.dish_id === dish_id
    )

    if (tagsToDelete.length > 0) {
      this.dishes_tags = this.dishes_tags.filter(
        (tag) => tag.dish_id !== dish_id
      )
    }

    this.dishes_tags.push(...tagsToInsert)

    return
  }

  async findUpdatedDishById(dish_id) {
    const dish = this.dishes.find((dish) => dish.id === dish_id)

    const dishsAndTagsUnsorted = this.dishes_tags
      .filter((tag) => tag.dish_id === dish_id)
      .map((tag) => {
        return {
          id: dish.id,
          name: dish.name,
          category: dish.category,
          description: dish.description,
          price_cents: dish.price_cents,
          tag_id: tag.id,
          tag: tag.name,
        }
      })

    return dishsAndTagsUnsorted
  }

  async findDishByDishId(dish_id) {
    const dish = this.dishes.find((dish) => dish.id === dish_id)

    return dish
  }
}

module.exports = DishesRepository
