const AppError = require("../../utils/AppError")
const { hash } = require("bcryptjs")

class AdminCreateService {
  constructor(AdminRepository) {
    this.AdminRepository = AdminRepository
  }

  async execute({ name, email, password }) {
    try {
      const checkIfEmailAlreadyExists = await this.AdminRepository.findByEmail(
        email
      )

      if (checkIfEmailAlreadyExists) {
        throw new AppError("Email já está em uso")
      }

      const hashedPassword = await hash(password, 8)

      const AdminCreated = await this.AdminRepository.create({
        name,
        email,
        password: hashedPassword,
        role: "Admin",
      })

      return AdminCreated
    } catch (error) {
      throw new AppError(error.message)
    }
  }
}

module.exports = AdminCreateService
