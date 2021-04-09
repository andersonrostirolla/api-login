import { UserRepositoryPort, Command } from '../../ports'
import User from '../../models/User'

export default class GetUserByEmail implements Command<string, User> {
  constructor (
    private userRepository: UserRepositoryPort
  ) {}

  execute(email: string): Promise<User> {
    return this.userRepository.getByEmail(email)
  }
}
