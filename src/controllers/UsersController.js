const UsersRepository = require("../repositories/UserRepository")
const UsersCreateService = require("../services/UsersServices/UsersCreateService")
const UsersShowService = require("../services/UsersServices/UsersShowService")

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

  async show(req, res) {
    const { id } = req.user

    const usersRepository = new UsersRepository()

    const usersShowService = new UsersShowService(usersRepository)

    const user = await usersShowService.execute(id)

    return res.json(user)
  }
}

module.exports = UsersController
