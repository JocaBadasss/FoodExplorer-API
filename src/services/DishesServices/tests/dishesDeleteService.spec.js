const DishesDeleteService = require("../DishesDeleteService")
const DishesRepositoryInMemory = require("../../../repositories/InMemory/DishesRepositoryInMemory")

describe("DishesDeleteService", () => {
  it("should be able to delete a dish", async () => {
    const dish_id = 1

    const dishesRepository = new DishesRepositoryInMemory()
    const dishesDeleteService = new DishesDeleteService(dishesRepository)

    const isDeleted = await dishesDeleteService.execute( dish_id )

    expect(isDeleted).toBeTruthy()
  })
})
