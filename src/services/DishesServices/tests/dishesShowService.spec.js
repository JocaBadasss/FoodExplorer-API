const DishesShowService = require("../DishesShowService")
const DishesRepositoryInMemory = require("../../../repositories/InMemory/DishesRepositoryInMemory")

describe("DishesShowService", () => {
  it("should be able to show a dish", async () => {
    const dish_id = 1

    const dishesRepository = new DishesRepositoryInMemory()
    const dishesShowService = new DishesShowService(dishesRepository)

    const dish = await dishesShowService.execute({ dish_id })

    expect(dish).toHaveProperty("id")
  })
})
