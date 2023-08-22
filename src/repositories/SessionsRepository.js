const knex = require("../database/knex")

class SessionsRepository {
  async findUserByEmail(email) {
    const user = await knex("users").select("*").where("email", email).first()
    return user
  }
}

module.exports = SessionsRepository
