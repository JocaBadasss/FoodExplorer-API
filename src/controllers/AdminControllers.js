const AdminCreateService = require("../services/AdminServices/AdminCreateService")
const AdminRepository = require("../repositories/AdminRepository")

class AdminControllers {
  async create(req, res) {
    const { name, email, password } = req.body

    const adminRepository = new AdminRepository()
    const adminCreateService = new AdminCreateService(adminRepository)

    await adminCreateService.execute({
      name,
      email,
      password,
    })

    return res.json()
  }
}

module.exports = AdminControllers
