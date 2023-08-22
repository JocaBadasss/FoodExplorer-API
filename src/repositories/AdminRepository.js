const knex = require("../database/knex")

class AdminRepository {
  async findByEmail(email) {
    const admin = await knex("users").select("*").where("email", email).first()
    return admin
  }

  async create({ name, email, password, role }) {
    const adminId = await knex("users").insert({
      name,
      email,
      password,
      role,
    })

    return { id: adminId }
  }
}

module.exports = AdminRepository