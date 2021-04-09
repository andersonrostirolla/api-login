import UserRepository from 'src/core/ports/UserRepositoryPort'
import User from '../../../../core/models/User'

export default class MongooseUserRepository implements UserRepository {
  private users: User[] = []

  async create(user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  async delete(email: string): Promise<void> {
    this.users = this.users.filter(user => user.email !== email)
  }

  async update(user: User): Promise<User> {
    let userUpdated = await this.getByEmail(user.email)
    const indexToUpdate = this.users.findIndex((user) => user.email === userUpdated.email )
    userUpdated = {
      ...userUpdated,
      ...user
    }
    this.users[indexToUpdate] = userUpdated
    return new User(userUpdated.email, userUpdated.password, userUpdated.name)
  }

  async getByEmail(emailUser: string): Promise<User> {
    const user = this.users.find(({ email }) =>  email === emailUser)
    if (!user) {
      throw Error('Nenhum email encontrado!')
    }
    return user
  }
}
