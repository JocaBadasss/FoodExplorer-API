class AdminRepositoryInMemory {
  admins = []

  async findByEmail(email) {
    this.admins.find((admin) => admin.email === email)
  }

  async create({ email, name, password }) {
    const admin = {
      id: Math.floor(Math.random() * 1000) + 1,
      email,
      name,
      password,
    }
    this.admins.push(admin)

    return admin
  }
}

module.exports = AdminRepositoryInMemory
