import { UserRepositoryPort, Command } from '../../ports'
import User from '../../models/User'
import { Login as LoginInterface } from '../../interfaces' 

export default class Login implements Command<LoginInterface, User> {
  constructor (
    private userRepository: UserRepositoryPort
  ) {}

  execute(login: LoginInterface): Promise<User> {
    return this.userRepository.login(login)
  }
}
