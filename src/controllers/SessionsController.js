const SessionsRepository = require("../repositories/SessionsRepository")
const SessionsCreateServices = require("../services/SessionsServices/SessionsCreateServices")

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body

    const sessionsRepository = new SessionsRepository()
    const sessionsCreateServices = new SessionsCreateServices(
      sessionsRepository
    )

    const session = await sessionsCreateServices.execute({ email, password })

    return res.json(session)
  }
}

module.exports = SessionsController
