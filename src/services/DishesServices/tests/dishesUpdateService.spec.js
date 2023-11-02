const DishesRepositoryInMemory = require("../../../repositories/InMemory/DishesRepositoryInMemory")
const DishesUpdateService = require("../DishesUpdateService")

describe("DishesUpdateService", () => {
  let dishesRepositoryInMemory = null
  let dishesUpdateService = null

  beforeEach(() => {
    dishesRepositoryInMemory = new DishesRepositoryInMemory()
    dishesUpdateService = new DishesUpdateService(dishesRepositoryInMemory)
  })

  it("should be able to update a dish", async () => {
    const dish = {
      id: 1,
      name: "Salada Ravanello",
      category: "Sobremesas",
      description:
        "Torta de ameixa com massa amanteigada, polvilho em cachacça.",
      price_cents: "79,97",
      tags: ["alface", "cebola", "pão naan", "pepino", "rabanete", "tomate"],
    }

    const dishUpdated = await dishesUpdateService.execute(dish)

    expect(dishUpdated).toEqual({
      id: 1,
      name: "Salada Ravanello",
      category: "Sobremesas",
      description:
        "Torta de ameixa com massa amanteigada, polvilho em cachacça.",
      price_cents: 7997,
      tags: [
        { id: 1, name: "alface" },
        { id: 2, name: "cebola" },
        { id: 3, name: "pão naan" },
        { id: 4, name: "pepino" },
        { id: 5, name: "rabanete" },
        { id: 6, name: "tomate" },
      ],
    })
  })
})
