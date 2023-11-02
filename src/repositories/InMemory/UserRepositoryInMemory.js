class UserRepositoryInMemory {
  users = []
  async findByEmail(email) {
    const user = this.users.find((user) => user.email === email)
    return user
  }

  async create({ name, email, password, role }) {
    const userId = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
      password,
      role,
    }

    this.users.push(userId)

    return { id: userId }
  }

  async findById(id) {
    // const user = await knex("users").select("*").where("id", id).first()
    // return user
  }
}

module.exports = UserRepositoryInMemory
