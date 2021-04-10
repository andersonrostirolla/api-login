import { UserRepositoryPort, Command } from '../../ports'
import User from '../../models/User'
import { UserWithoutPassword } from '../../interfaces'

export default class RecoverPassword
implements Command<UserWithoutPassword, User> {
  constructor (private userRepository: UserRepositoryPort) {}

  execute (user: UserWithoutPassword): Promise<User> {
    return this.userRepository.recoverPassword(user)
  }
}
