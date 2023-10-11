const AdminCreateService = require("./AdminCreateService")
const AdminRepositoryInMemory = require("../repositories/AdminInMemoryRepository")

it("admin should be created", async () => {
  const admin = {
    name: "admin",
    email: "admin@test.com",
    password: "admin",
  }

  const adminRepositoryInMemory = new AdminRepositoryInMemory()
  const adminCreateService = new AdminCreateService(adminRepositoryInMemory)
  const adminCreated = await adminCreateService.execute(admin)

  expect(adminCreated).toHaveProperty("id")
})
