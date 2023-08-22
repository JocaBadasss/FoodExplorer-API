const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../configs/auth")

function ensureIsMaster(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError("Token não informado", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id, role } = verify(token, authConfig.jwt.secretMaster)

    if (role !== "Master") {
      throw new AppError("Acesso não autorizado", 401)
    }

    req.user = {
      id: user_id,
      role,
    }

    return next()
  } catch (error) {
    throw new AppError(error.message, 401)
  }
}

module.exports = ensureIsMaster
