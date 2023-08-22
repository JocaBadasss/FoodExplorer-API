const AppError = require("../utils/AppError")
const { compare } = require("bcryptjs")
const AuthConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")

class SessionsCreateServices {
  constructor(SessionsRepository) {
    this.SessionsRepository = SessionsRepository
  }

  async execute({ email, password }) {
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
  }
}

module.exports = SessionsCreateServices
