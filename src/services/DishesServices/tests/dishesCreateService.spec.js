const DishesCreateServices = require("../DishesCreateService")
const DishesRepositoryInMemory = require("../../../repositories/InMemory/DishesRepositoryInMemory")
const AppError = require("../../../utils/AppError")

describe("DishesCreateServices", () => {
  let dishesRepository = null
  let dishesCreateServices = null

  beforeEach(() => {
    dishesRepository = new DishesRepositoryInMemory()
    dishesCreateServices = new DishesCreateServices(dishesRepository)
  })

  it("should be able to create a dish", async () => {
    const dish = {
      name: "Salada Ravanello",
      category: "Refeições",
      description:
        "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.",
      price_cents: "79,97",
      tags: ["alface", "cebola", "pão naan", "pepino", "rabanete", "tomate"],
    }

    const dishCreated = await dishesCreateServices.execute(dish)

    expect(typeof dishCreated).toBe("number")
  })

  it("should not be able to create a dish with same name", async () => {
    const dish = {
      id: 1,
      name: "Prugna Pie",
      category: "Sobremesas",
      description:
        "Torta de ameixa com massa amanteigada, polvilho em cachacça.",
      price_cents: "79,97",
      tags: ["alface", "cebola", "pão naan", "pepino", "rabanete", "tomate"],
    }

    await expect(async () => {
      await dishesCreateServices.execute(dish)
    }).rejects.toEqual(new AppError("Prato já existe", 400))
  })

  it("should not be able to create a dish with invalid price", async () => {
    const dish = {
      name: "Salada Ravanello",
      category: "Refeições",
      description:
        "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.",
      price_cents: 7997,
      tags: ["alface", "cebola", "pão naan", "pepino", "rabanete", "tomate"],
    }

    const dish1 = {
      name: "Salada Ravanello1",
      category: "Refeições",
      description:
        "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.",
      price_cents: -1,
      tags: ["alface", "cebola", "pão naan", "pepino", "rabanete", "tomate"],
    }

    const dish2 = {
      name: "Salada Ravanello3",
      category: "Refeições",
      description:
        "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.",
      price_cents: "00,00",
      tags: ["alface", "cebola", "pão naan", "pepino", "rabanete", "tomate"],
    }

    const dish3 = {
      name: "Salada Ravanello1",
      category: "Refeições",
      description:
        "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.",
      price_cents: "-11,11",
      tags: ["alface", "cebola", "pão naan", "pepino", "rabanete", "tomate"],
    }

    await expect(async () => {
      await dishesCreateServices.execute(dish)
    }).rejects.toEqual(
      new AppError(
        "Erro de validação: O valor deve estar no formato xx,xx (por exemplo, 10,50)",
        400
      )
    )

    await expect(async () => {
      await dishesCreateServices.execute(dish1)
    }).rejects.toEqual(
      new AppError(
        "Erro de validação: O valor deve estar no formato xx,xx (por exemplo, 10,50)",
        400
      )
    )
    await expect(async () => {
      await dishesCreateServices.execute(dish2)
    }).rejects.toEqual(
      new AppError(
        "Erro de validação: O valor deve estar no formato xx,xx (por exemplo, 10,50)",
        400
      )
    )

    await expect(async () => {
      await dishesCreateServices.execute(dish3)
    }).rejects.toEqual(
      new AppError(
        "Erro de validação: O valor deve estar no formato xx,xx (por exemplo, 10,50)",
        400
      )
    )
  })

  it("should not be able to create a dish with a tag greater than 12 characters", async () => {
    const dish = {
      name: "Salada Ravanello",
      category: "Refeições",
      description:
        "Rabanetes, folhas verdes e molho agridoce salpicados com gergelim. O pão naan dá um toque especial.",
      price_cents: "79,97",
      tags: [
        "alface",
        "cebola",
        "pão naan",
        "pepino",
        "rabanete",
        "tomate",
        "1234567891234",
      ],
    }

    await expect(async () => {
      await dishesCreateServices.execute(dish)
    }).rejects.toEqual(
      new AppError(
        "Erro de validação: Um ingrediente deve ter no máximo 12 caracteres",
        400
      )
    )
  })

  it("should not be able to create a dish with one or more fields missing, should show the errors correctly", async () => {
    const dish = {
      name: "",
      category: "",
      description: "",
      price_cents: "",
      tags: [],
    }

    try {
      await dishesCreateServices.execute(dish)
      fail("O serviço deveria lançar uma exceção de validação")
    } catch (error) {
      expect(error instanceof AppError).toBeTruthy()
      expect(error.message).toContain("Erro de validação")
      expect(error.message).toContain("O nome é obrigatório")
      expect(error.message).toContain("A categoria é obrigatória")
      expect(error.message).toContain("A descrição é obrigatória")
      expect(error.message).toContain("O valor é obrigatório")
      expect(error.message).toContain("O valor deve estar no formato xx,xx")
      expect(error.message).toContain("Nenhum ingrediente pode estar vazio")
      expect(error.statusCode).toEqual(400)
    }
  })

  it("should show all type errors correctly", async () => {
    const dish = {
      name: 12,
      category: 12,
      description: 12,
      price_cents: 12,
      tags: 1,
    }

    try {
      await dishesCreateServices.execute(dish)
      fail("O serviço deveria gerar uma exceção de validação")
    } catch (error) {
      expect(error instanceof AppError).toBeTruthy()
      expect(error.message).toContain("Erro de validação")
      expect(error.message).toContain("O nome deve ser em texto")
      expect(error.message).toContain("A categoria deve ser em texto")
      expect(error.message).toContain("A descrição deve ser em texto")
      expect(error.message).toContain("O valor deve estar no formato xx,xx")
      expect(error.message).toContain("As tags devem estar em um array")
      expect(error.statusCode).toEqual(400)
    }
  })

  it("should not be able to create a dish with invalid tags", async () => {
    const dish = {
      name: "Salada de Inverno",
      category: "Saladas",
      description: "Uma deliciosa salada de inverno",
      price_cents: "15,00",
      tags: ["alface", "tomate", "azeitonas", "abacaxi-melão-morango"],
    }

    const dish1 = {
      name: "Salada de Inverno",
      category: "Saladas",
      description: "Uma deliciosa salada de inverno",
      price_cents: "15,00",
      tags: ["alface", "tomate", "azeitonas", "sa"],
    }

    try {
      await dishesCreateServices.execute(dish)
      fail("O serviço deveria gerar uma exceção de validação")
    } catch (error) {
      expect(error instanceof AppError).toBeTruthy()
      expect(error.message).toContain("Erro de validação")
      expect(error.message).toContain(
        "Um ingrediente deve ter no máximo 12 caracteres"
      )
      expect(error.statusCode).toEqual(400)
    }

    try {
      await dishesCreateServices.execute(dish1)
      fail("O serviço deveria gerar uma exceção de validação")
    } catch (error) {
      expect(error instanceof AppError).toBeTruthy()
      expect(error.message).toContain("Erro de validação")
      expect(error.message).toContain(
        "Um ingrediente deve ter pelo menos 3 caracteres"
      )
      expect(error.statusCode).toEqual(400)
    }
  })

  it("should not be able to create a dish with a description that exceeds the maximum character limit", async () => {
    const dishWithLongDescription = {
      name: "Prato Longo",
      category: "Categoria",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non luctus lectus, eu sodales ligula. Nullam nec rhoncus lorem. Nullam tristique libero et turpis varius, et aliquet purus elementum. Nulla facilisi. Nam id nulla erat. Sed finibus est nec urna interdum, in eleifend metus lacinia. Sed vitae nunc id odio viverra suscipit. Proin venenatis purus id libero bibendum, id viverra orci facilisis. Nulla vitae erat sed justo feugiat sagittis sit amet eu nulla.",
      price_cents: "19,99",
      tags: ["tag1", "tag2", "tag3"],
    }

    await expect(async () => {
      await dishesCreateServices.execute(dishWithLongDescription)
    }).rejects.toEqual(
      new AppError(
        "Erro de validação: A descrição deve ter no máximo 300 caracteres",
        400
      )
    )
  })

  it("should be able to create dishes in bulk", async () => {
    const numberOfDishes = 1000 

    for (let i = 0; i < numberOfDishes; i++) {
      const dish = {
        name: `Dish ${i}`,
        category: "Categoria",
        description: `Descrição do prato ${i}`,
        price_cents: "29,99",
        tags: ["tag1", "tag2", "tag3"],
      }

      const dishCreated = await dishesCreateServices.execute(dish)

      expect(typeof dishCreated).toBe("number")
    }
  })
})
