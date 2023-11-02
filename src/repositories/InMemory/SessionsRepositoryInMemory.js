const { hashSync } = require("bcryptjs")

class SessionsRepositoryInMemory {
  users = [
    {
      id: 1,
      name: "User Test",
      email: "usertest@email.com",
      password: hashSync("12345678", 8),
      role: "User",
    },
  ]

  async findUserByEmail(email) {
    const user = this.users.find((user) => user.email === email)
    return user
  }
}

module.exports = SessionsRepositoryInMemory
