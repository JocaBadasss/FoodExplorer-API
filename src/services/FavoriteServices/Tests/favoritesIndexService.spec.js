const FavoritesIndexService = require("../FavoritesIndexService")
const FavoritesRepositoryInMemory = require("../../../repositories/InMemory/FavoritesRepositoryInMemory")

describe("FavoritesIndexService", () => {
  it("should be able to index all favorites", async () => {
    const favoritesRepository = new FavoritesRepositoryInMemory()
    const favoritesIndexService = new FavoritesIndexService(favoritesRepository)

    const favorites = await favoritesIndexService.execute(1)

    expect(Array.isArray(favorites)).toBe(true)
    expect(favorites).toEqual(
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
