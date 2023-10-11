const AppError = require("../../utils/AppError")
const { hash } = require("bcryptjs")

class AdminCreateService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository
  }

  async execute({ name, email, password }) {
    const checkIfEmailAlreadyExists = await this.UserRepository.findByEmail(
      email
    )

    if (checkIfEmailAlreadyExists) {
      throw new AppError("Email já está em uso")
    }

    const hashedPassword = await hash(password, 8)

    const userCreated = await this.UserRepository.create({
      name,
      email,
      password: hashedPassword,
      role: "User",
    })

    return userCreated
  }
}

module.exports = AdminCreateService
