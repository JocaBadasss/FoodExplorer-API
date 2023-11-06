const DishesIndexService = require("../DishesIndexService")
const DishesRepositoryInMemory = require("../../../repositories/InMemory/DishesRepositoryInMemory")

describe("DishesIndexService", () => {
  it("should be able to index all dishes", async () => {
    const dishesRepository = new DishesRepositoryInMemory()
    const dishesIndexService = new DishesIndexService(dishesRepository)

    const dishes = await dishesIndexService.execute()

    expect(dishes).toHaveLength(5)
  })
})
