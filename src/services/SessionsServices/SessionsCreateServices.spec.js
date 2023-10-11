const SessionsCreateServices = require("./SessionsCreateServices")
const SessionsInMemoryRepository = require("../repositories/SessionsInMemoryRepository ")

it("should be able to create a new session", async () => {


  const admin = {
    email: "admin@test.com",
    password: "123",
  }

  const master = {
    email: "master@test.com",
    password: "123",
  }

  const user = {
    email: "user@test.com",
    password: "123",
  }

  const sessionsInMemoryRepository = new SessionsInMemoryRepository()
  const sessionsCreateServices = new SessionsCreateServices(
    sessionsInMemoryRepository
  )

  const session = await sessionsCreateServices.execute(admin)

  expect(session).toHaveProperty("token")
  expect(session).toHaveProperty("user")

})
