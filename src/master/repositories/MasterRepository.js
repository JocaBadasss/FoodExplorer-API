const knex = require("../../database/knex")

class MasterRepository {
  async findByRole(Master) {
    const master = await knex("users").select("*").where("role", Master)

    return master
  }

  async create({ name, email, password, role }) {
    await knex("users").insert({
      name,
      email,
      password,
      role,
    })
  }
}

module.exports = MasterRepository
