const DishesRepositoryInMemory = require("../../../repositories/InMemory/DishesRepositoryInMemory")
const AppError = require("../../../utils/AppError")
const DishesUpdateService = require("../DishesUpdateService")

describe("DishesUpdateService", () => {
  let dishesRepositoryInMemory = null
  let dishesUpdateService = null
  const user_id = 1

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

    const { id, name, category, description, price_cents, tags } = dish

    const dishUpdated = await dishesUpdateService.execute({
      id,
      name,
      category,
      description,
      price_cents,
      tags,
      user_id,
    })

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

  it("should not be able to update a dish with invalid price", async () => {
    const dish = {
      id: 1,
      name: "Salada Ravanello",
      category: "Sobremesas",
      description:
        "Torta de ameixa com massa amanteigada, polvilho em cachacça.",
      price_cents: -1,
      tags: ["alface", "cebola", "pão naan", "pepino", "rabanete", "tomate"],
    }

    const { id, name, category, description, price_cents, tags } = dish

    try {
      await dishesUpdateService.execute(dish)
      fail("O serviço deveria gerar uma exceção de validação")
    } catch (error) {
      expect(error instanceof AppError).toBeTruthy()
      expect(error.message).toContain("Erro de validação")
      expect(error.message).toContain(
        "O valor deve estar no formato xx,xx (por exemplo, 10,50)"
      )
      expect(error.statusCode).toEqual(400)
    }
  })

  it("should be able to update the dishs tags", async () => {
    const dish = {
      id: 1,
      name: "Salada Ravanello",
      category: "Sobremesas",
      description:
        "Torta de ameixa com massa amanteigada, polvilho em cachacça.",
      price_cents: "79,97",
      tags: ["suco", "gengibre"],
    }

    const { id, name, category, description, price_cents, tags } = dish

    const dishUpdated = await dishesUpdateService.execute({
      id,
      name,
      category,
      description,
      price_cents,
      tags,
      user_id,
    })

    expect(dishUpdated).toEqual({
      id: 1,
      name: "Salada Ravanello",
      category: "Sobremesas",
      description:
        "Torta de ameixa com massa amanteigada, polvilho em cachacça.",
      price_cents: 7997,
      tags: [
        { id: 1, name: "suco" },
        { id: 2, name: "gengibre" },
      ],
    })
  })

  it("should not be able to update a dish that does not exist", async () => {
    const dish = {
      id: 7,
      name: "Salada Ravanello",
      category: "Sobremesas",
      description:
        "Torta de ameixa com massa amanteigada, polvilho em cachacça.",
      price_cents: "79,97",
      tags: ["alface", "cebola", "pão naan", "pepino", "rabanete", "tomate"],
    }

    const { id, name, category, description, price_cents, tags } = dish

    try {
      await dishesUpdateService.execute({
        id,
        name,
        category,
        description,
        price_cents,
        tags,
        user_id,
      })
      fail("O serviço deveria gerar uma exceção de validação")
    } catch (error) {
      expect(error instanceof AppError).toBeTruthy()
      expect(error.message).toContain("Prato não encontrado")
      expect(error.statusCode).toEqual(400)
    }
  })
})
