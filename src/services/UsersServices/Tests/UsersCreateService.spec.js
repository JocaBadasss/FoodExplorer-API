const AppError = require("../../../utils/AppError")
const UserCreateService = require("../UsersCreateService")
const UserRepositoryInMemory = require("../../../repositories/InMemory/UserRepositoryInMemory")

describe("UserCreateService", () => {
  let userRepositoryInMemory = null
  let userCreateService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)
  })

  it("user should be create a user", async () => {
    const user = {
      name: "User test",
      email: "user@test.com",
      password: "12345678",
    }

    const userCreated = await userCreateService.execute(user)

    expect(userCreated).toHaveProperty("id")
  })

  it("user should not be create with existent email", async () => {
    const user = {
      name: "master",
      email: "master@test.com",
      password: "12345678",
    }

    const user1 = {
      name: "master",
      email: "master@test.com",
      password: "12345678",
    }

    await userCreateService.execute(user)

    await expect(async () => {
      await userCreateService.execute(user1)
    }).rejects.toEqual(new AppError("Email já está em uso", 401))
  })
})
