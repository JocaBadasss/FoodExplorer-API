const FavoritesDeleteService = require("../FavoritesDeleteService")
const FavoritesRepositoryInMemory = require("../../../repositories/InMemory/FavoritesRepositoryInMemory")

describe("FavoritesDeleteService", () => {
  it("should be able to delete a favorite", async () => {
    const favoritesRepository = new FavoritesRepositoryInMemory()
    const favoritesDeleteService = new FavoritesDeleteService(
      favoritesRepository
    )

    await favoritesDeleteService.execute({
      user_id: 1,
      dish_id: 1,
    })

    expect(favoritesRepository.favorites.length).toBe(0)
  })
})
