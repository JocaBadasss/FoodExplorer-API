const SessionsCreateServices = require("../SessionsCreateServices")
const SessionsRepositoryInMemory = require("../../../repositories/InMemory/SessionsRepositoryInMemory")
const AppError = require("../../../utils/AppError")
require("dotenv").config()

describe("SessionsCreateServices", () => {
  let sessionsRepositoryInMemory = null
  let sessionsCreateServices = null

  beforeEach(() => {
    sessionsRepositoryInMemory = new SessionsRepositoryInMemory()
    sessionsCreateServices = new SessionsCreateServices(
      sessionsRepositoryInMemory
    )
  })

  it("should be able to create a session", async () => {
    const user = {
      id: 1,
      name: "User Test",
      email: "usertest@email.com",
      password: "12345678",
      role: "User",
    }

    const expectedSession = {
      token: expect.any(String),

      user: {
        email: expect.any(String),
        id: expect.any(Number),
        name: expect.any(String),
        password: expect.any(String),
        role: expect.any(String),
      },
    }

    const session = await sessionsCreateServices.execute({
      email: user.email,
      password: user.password,
    })

    expect(session).toMatchObject(expectedSession)
  })

  it("should not be able to create a session with not existent email & wrong password", async () => {
    const user = {
      id: 1,
      name: "User Test Wrong",
      email: "usertestwtrong@email.com",
      password: "012345678",
      role: "User",
    }

    await expect(async () => {
      await sessionsCreateServices.execute({
        email: user.email,
        password: user.password,
      })
    }).rejects.toEqual(new AppError("Email ou senha inválidos", 401))
  })
})
