const AppError = require("../../utils/AppError")
const { hash } = require("bcryptjs")

class MasterCreateService {
  constructor(MasterRepository) {
    this.MasterRepository = MasterRepository
  }

  async execute({ Master, name, email, password, role }) {
    const checkIfMasterExists = await this.MasterRepository.findByRole(Master)

    if (checkIfMasterExists.length > 0) {
      return
    }

    const hashedPassword = await hash(password, 8)

    const MasterCreated = await this.MasterRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    })

    return MasterCreated
  }
}

module.exports = MasterCreateService
