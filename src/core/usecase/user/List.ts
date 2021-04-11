import { UserRepositoryPort, Command } from '../../ports'
import User from '../../models/User'

export default class List implements Command<void, User[]> {
  constructor (private userRepository: UserRepositoryPort) {}

  execute (): Promise<User[]> {
    return this.userRepository.list()
  }
}
