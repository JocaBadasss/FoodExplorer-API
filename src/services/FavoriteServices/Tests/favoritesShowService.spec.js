const FavoritesShowService = require("../FavoritesShowService")
const FavoritesRepositoryInMemory = require("../../../repositories/InMemory/FavoritesRepositoryInMemory")

describe("FavoritesShowService", () => {
  it("should be able to show a favorite", async () => {
    const favoritesRepository = new FavoritesRepositoryInMemory()
    const favoritesShowService = new FavoritesShowService(favoritesRepository)

    const favorite = await favoritesShowService.execute({
      user_id: 1,
      dish_id: 1,
    })

    expect(Object.keys(favorite).length).toBe(3)
    expect(favorite).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        user_id: expect.any(Number),
        dish_id: expect.any(Number),
      })
    )
  })
})
