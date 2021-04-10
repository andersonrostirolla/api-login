import { UserRepositoryPort, Command } from '../../ports'
import User from '../../models/User'

export default class Update implements Command<User, User> {
  constructor (private userRepository: UserRepositoryPort) {}

  execute (user: User): Promise<User> {
    return this.userRepository.update(user)
  }
}
