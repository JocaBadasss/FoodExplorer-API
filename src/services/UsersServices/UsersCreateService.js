const AppError = require("../../utils/AppError")
const { hash } = require("bcryptjs")
const userCreateValidationSchema = require("../../schemas/UsersValidations/userCreateServiceValidation")

class UsersCreateService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository
  }

  async execute({ name, email, password }) {
    try {
      await userCreateValidationSchema.validate(
        { name, email, password },
        {
          abortEarly: false,
        }
      )
    } catch (error) {
      throw new AppError(`Erro de validação: ${error.message}`)
    }

    try {
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
    } catch (error) {
      throw new AppError(error.message, 401)
    }
  }
}

module.exports = UsersCreateService
