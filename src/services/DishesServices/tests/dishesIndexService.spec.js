const DishesIndexService = require("../DishesIndexService")
const DishesRepositoryInMemory = require("../../../repositories/InMemory/DishesRepositoryInMemory")

describe("DishesIndexService", () => {
  it("should be able to index all dishes", async () => {
    const dishesRepository = new DishesRepositoryInMemory()
    const dishesIndexService = new DishesIndexService(dishesRepository)

    const dishes = await dishesIndexService.execute()

    expect(dishes).toHaveLength(6)
  })

  it("should be able to index dishes by query", async () => {
    const dishesRepository = new DishesRepositoryInMemory()
    const dishesIndexService = new DishesIndexService(dishesRepository)

    const dishes = await dishesIndexService.execute("prugna")

    expect(dishes).toHaveLength(1)
  })

  it("should be able to index dishes by tag query", async () => {
    const dishesRepository = new DishesRepositoryInMemory()
    const dishesIndexService = new DishesIndexService(dishesRepository)

    const dishes = await dishesIndexService.execute("rocketseat")


    expect(dishes).toHaveLength(1)
  })

  it("should no be able to index dishe by inexistent tag query", async () => {
    const dishesRepository = new DishesRepositoryInMemory()
    const dishesIndexService = new DishesIndexService(dishesRepository)

    const dishes = await dishesIndexService.execute("inexistent-tag")

    expect(dishes).toHaveLength(0)
  })
})
