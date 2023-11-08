const AppError = require("../../utils/AppError")

class usersShowService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }
  async execute(id) {
    try {
      const user = await this.usersRepository.findById(id)

      return user
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

module.exports = usersShowService
