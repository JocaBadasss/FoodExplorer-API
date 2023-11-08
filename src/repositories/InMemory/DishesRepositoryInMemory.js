class DishesRepository {
  dishes = [
    {
      id: 1,
      name: "Prugna Pie",
      category: "Sobremesas",
      description:
        "Torta de ameixa com massa amanteigada, polvilho em cachacça.",
      price_cents: 7997,
    },
    {
      id: 2,
      name: "Apple Crisp",
      category: "Sobremesas",
      description: "Crispy apple dessert with a crumbly topping.",
      price_cents: 8997,
    },
    {
      id: 3,
      name: "Banana Bread",
      category: "Sobremesas",
      description: "Moist banana bread with a touch of cinnamon.",
      price_cents: 7597,
    },
    {
      id: 4,
      name: "Cherry Tart",
      category: "Sobremesas",
      description: "Sweet cherry filling in a flaky pie crust.",
      price_cents: 8497,
    },
    {
      id: 5,
      name: "Peach Cobbler",
      category: "Sobremesas",
      description: "Warm peach cobbler with a biscuit topping.",
      price_cents: 7797,
      image: "",
    },
    {
      id: 6,
      name: "Pumpkin Pie",
      category: "Sobremesas",
      description: "Tasty pumpkin pie with seasonal fruit.",
      price_cents: 8997,
      image: "",
    },
  ]
  nextDishId = 1
  nextTagId = 1
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
    { id: 7, name: "canela", dish_id: 2, user_id: 1 },
    { id: 8, name: "maçã", dish_id: 2, user_id: 1 },
    { id: 9, name: "noz-moscada", dish_id: 2, user_id: 1 },
    { id: 10, name: "banana", dish_id: 3, user_id: 1 },
    { id: 11, name: "canela", dish_id: 3, user_id: 1 },
    { id: 12, name: "cereja", dish_id: 4, user_id: 1 },
    { id: 13, name: "massa folhada", dish_id: 4, user_id: 1 },
    { id: 14, name: "pêssego", dish_id: 5, user_id: 1 },
    { id: 15, name: "cobertura de biscoito", dish_id: 5, user_id: 1 },
    { id: 16, name: "rocketseat", dish_id: 6, user_id: 1 },
  ]

  async verifyIfDishNameAlreadyExists(name) {
    let dish
    dish = this.dishes.find((dish) => dish.name === name)

    if (dish) {
      return [dish]
    }

    if (!dish) {
      return (dish = [])
    }

    return dish
  }
  async createDish({ name, category, description, price_cents, user_id }) {
    const dish_id = this.nextDishId++

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

  async updateDish({ name, category, description, price_cents, dish_id }) {
    const updatedDish = this.dishes.find((dish) => dish.id === dish_id)

    updatedDish.name = name
    updatedDish.category = category
    updatedDish.description = description
    updatedDish.price_cents = price_cents

    return
  }

  async updateTags({ tagsToInsert, dish_id, user_id }) {
    const deletedTags = this.dishes_tags.filter(
      (tags) => tags.user_id !== user_id && tags.dish_id === dish_id
    )

    this.dishes_tags = deletedTags

    const newTags = tagsToInsert.map((tag) => {
      return {
        id: this.nextTagId++,
        name: tag.name,
        dish_id,
        user_id,
      }
    })

    this.dishes_tags.push(...newTags)

    return
  }

  async findDishByDishId(dish_id) {
    const dish = this.dishes.find((dish) => dish.id === dish_id)

    return dish
  }

  async findUpdatedDishAndTagsById(dish_id) {
    const dish = this.dishes.find((dish) => dish.id === dish_id)

    const dishsAndTagsUnsorted = this.dishes_tags
      .filter((tags) => tags.dish_id === dish_id)
      .map((tags) => {
        return {
          id: dish.id,
          name: dish.name,
          category: dish.category,
          description: dish.description,
          price_cents: dish.price_cents,
          tag: tags.name,
          tag_id: tags.id,
        }
      })

    return dishsAndTagsUnsorted
  }

  async findDishAndTagsByDishId({ dish_id }) {
    const dish = this.dishes.find((dish) => dish.id === dish_id)

    const tags = this.dishes_tags.filter((tags) => tags.dish_id === dish_id)

    return { ...dish, tags }
  }

  async indexAllDishes() {
    const dishes = this.dishes

    return dishes
  }

  async indexByQuery(query) {
    const searchWords = query.split(" ")
    const filteredDishes = []

    for (const dish of this.dishes) {
      const dishTags = this.dishes_tags.filter((tag) => tag.dish_id === dish.id)
      const tagNames = dishTags.map((tag) => tag.name)

      if (
        searchWords.some((word) =>
          dish.name.toLowerCase().includes(word.toLowerCase())
        ) ||
        searchWords.some((word) =>
          dish.category.toLowerCase().includes(word.toLowerCase())
        ) ||
        searchWords.some((word) =>
          dish.description.toLowerCase().includes(word.toLowerCase())
        ) ||
        searchWords.some((word) =>
          tagNames.some((tagName) =>
            tagName.toLowerCase().includes(word.toLowerCase())
          )
        )
      ) {
        filteredDishes.push(dish)
      }
    }

    return filteredDishes
  }

  async deleteDish(dish_id) {
    const initialLength = this.dishes.length

    this.dishes = this.dishes.filter((dish) => dish.id !== dish_id)

    const isDeleted = this.dishes.length < initialLength

    return isDeleted
  }

  async updateDishImage({ imageFileName, dish_id }) {
    const updatedDish = this.dishes.find((d) => d.id === dish_id)

    if (updatedDish) {
      updatedDish.image = imageFileName

      return updatedDish
    }
  }

  async deleteDishImage(dish) {
    if (dish && dish.image) {
      dish.image = null
    }
  }
}

module.exports = DishesRepository
