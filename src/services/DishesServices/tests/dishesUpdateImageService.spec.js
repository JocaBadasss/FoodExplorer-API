const DishesUpdateImageService = require("../DishesUpdateImageService")
const DishesRepositoryInMemory = require("../../../repositories/InMemory/DishesRepositoryInMemory")
const AppError = require("../../../utils/AppError")

describe("DishesServices", () => {
  let dishesUpdateImageService
  let dishesRepositoryInMemory

  beforeAll(() => {
    dishesRepositoryInMemory = new DishesRepositoryInMemory()
    dishesUpdateImageService = new DishesUpdateImageService(
      dishesRepositoryInMemory
    )
  })

  it("should update the dish image successfully", async () => {
    const dishId = 5
    const imageFileName = "example.jpg"

    const updatedDish = await dishesUpdateImageService.execute({
      dish_id: dishId,
      imageFileName: imageFileName,
    })

    expect(updatedDish.image).toBe(imageFileName)
  })

  it("should delete the existing dish image before updating", async () => {
    const dishId = 5
    const imageFileName = "example.jpg"

    const updatedDish = await dishesUpdateImageService.execute({
      dish_id: dishId,
      imageFileName: imageFileName,
    })

    expect(updatedDish.image).toBe(imageFileName)
  })

  it("should not be able to update a dish that does not exist", async () => {
    const dishId = 999
    const imageFileName = "example.jpg"

    try {
      await dishesUpdateImageService.execute({
        dish_id: dishId,
        imageFileName: imageFileName,
      })
      fail("O serviço deveria gerar uma exceção de validação")
    } catch (error) {
      expect(error instanceof AppError).toBeTruthy()
      expect(error.message).toContain("Dish not found")
      expect(error.statusCode).toEqual(400)
    }
  })
})
