class usersShowService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }
  async execute(id) {
    const user = await this.usersRepository.findById(id)

    return user
  }
}

module.exports = usersShowService
