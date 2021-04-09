import User from '../models/User'

export default interface UserRepositoryPort {
  create(user: User): Promise<User>,
  delete(email: string): Promise<void>,
  update(user: User): Promise<User>,
  getByEmail(email: string): Promise<User>
}
