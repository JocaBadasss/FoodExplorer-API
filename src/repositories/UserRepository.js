const knex = require("../database/knex")

class UserRepository {
  async findByEmail(email) {
    const user = await knex("users").select("*").where("email", email).first()
    return user
  }

  async create({ name, email, password, role }) {
    const userId = await knex("users").insert({
      name,
      email,
      password,
      role,
    })

    return { id: userId }
  }
}

module.exports = UserRepository
