const knex = require("../../database/knex")
const { hashSync } = require("bcryptjs")

class SessionsRepository {
  users = [
    {
      id: "1",
      name: "master",
      email: "master@test.com",
      password: hashSync("123", 8),
      role: "Master",
    },
    {
      id: "2",
      name: "admin",
      email: "admin@test.com",
      password: hashSync("123", 8),
      role: "Admin",
    },
    {
      id: "3",
      name: "user",
      email: "user@test.com",
      password: hashSync("123", 8),
      role: "User",
    },
  ]
  async findUserByEmail(email) {
    const user = this.users.find((user) => user.email === email)
    return user
  }
}

module.exports = SessionsRepository
