const FavoritesCreateService = require("../FavoritesCreateService")
const FavoritesRepositoryInMemory = require("../../../repositories/InMemory/FavoritesRepositoryInMemory")

describe("FavoritesCreateService", () => {
  it("should be able to create a favorite", async () => {
    const favoritesRepository = new FavoritesRepositoryInMemory()
    const favoritesCreateService = new FavoritesCreateService(
      favoritesRepository
    )

    const favorite = await favoritesCreateService.execute({
      user_id: 1,
      dish_id: 2,
    })

    expect(Array.isArray(favorite)).toBe(true)
    expect(favorite).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          user_id: expect.any(Number),
          dish_id: expect.any(Number),
        }),
      ])
    )
  })
})
