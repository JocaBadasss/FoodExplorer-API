const UsersRepository = require("../repositories/UserRepository")
const UsersCreateService = require("../services/UsersCreateService")

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body

    const usersRepository = new UsersRepository()
    const usersCreateService = new UsersCreateService(usersRepository)

    await usersCreateService.execute({
      name,
      email,
      password,
    })

    return res.json()
  }
}

module.exports = UsersController
