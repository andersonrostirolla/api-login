import { UserRepositoryPort, Command } from '../../ports'

export default class Delete implements Command<string, void> {
  constructor (
    private userRepository: UserRepositoryPort
  ) {}

  execute(email: string): Promise<void> {
    return this.userRepository.delete(email)
  }
}
