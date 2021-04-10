import { UserRepositoryPort, Command } from '../../ports'
import { Login } from '../../interfaces'

export default class TryLogin implements Command<Login, boolean> {
  constructor (private userRepository: UserRepositoryPort) {}

  execute (login: Login): Promise<boolean> {
    return this.userRepository.tryLogin(login)
  }
}
