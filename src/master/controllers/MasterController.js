const MasterRepository = require("../repositories/MasterRepository")
const MasterCreateService = require("../services/MasterCreateService")

class MasterController {
  async create() {
    const Master = "Master"

    const masterRepository = new MasterRepository()
    const masterCreateService = new MasterCreateService(masterRepository)

    await masterCreateService.execute({
      Master,
      name: "Master",
      email: process.env.MASTER_EMAIL,
      password: process.env.MASTER_PASSWORD,
      role: "Master",
    })
  }
}

module.exports = MasterController
