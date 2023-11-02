const AppError = require("../../utils/AppError")
const { compare } = require("bcryptjs")
const AuthConfig = require("../../configs/auth")
const { sign } = require("jsonwebtoken")
const sessionCreateValidationSchema = require("../../schemas/SessionsValidations/sessionCreateServiceValidation")

class SessionsCreateServices {
  constructor(SessionsRepository) {
    this.SessionsRepository = SessionsRepository
  }

  async execute({ email, password }) {
    try {
      await sessionCreateValidationSchema.validate(
        { email, password },
        {
          abortEarly: false,
        }
      )
    } catch (error) {
      throw new AppError(`Erro de validação: ${error.message}`)
    }

    try {
      const user = await this.SessionsRepository.findUserByEmail(email)

      if (!user) {
        throw new AppError("Email ou senha inválidos")
      }

      const passwordMatched = await compare(password, user.password)

      if (!passwordMatched) {
        throw new AppError("Email ou senha inválidos")
      }

      const { secret, secretMaster, expiresIn } = AuthConfig.jwt

      let selectedSecret = secret

      if (user.role === "Master") {
        selectedSecret = secretMaster
      }

      const token = sign({ role: user.role }, selectedSecret, {
        subject: String(user.id),
        expiresIn,
      })

      return { user, token }
    } catch (error) {
      throw new AppError(error.message, 401)
    }
  }
}

module.exports = SessionsCreateServices
