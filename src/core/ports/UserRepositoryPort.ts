import User from '../models/User'
import {
  UserWithoutPassword,
  Login
} from '../interfaces'

export default interface UserRepositoryPort {
  create(user: User): Promise<User>,
  delete(email: string): Promise<void>,
  update(user: User): Promise<User>,
  getByEmail(email: string): Promise<User>,
  recoverPassword(user: UserWithoutPassword): Promise<User>,
  login(login: Login): Promise<User>
}
