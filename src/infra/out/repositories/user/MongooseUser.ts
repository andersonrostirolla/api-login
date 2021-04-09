import UserRepository from 'src/core/ports/UserRepositoryPort'
import User from '../../../../core/models/User'
import MongooseUser from '../../models/MongooseUser'
import mongoose from 'mongoose'

export default class MongooseUserRepository implements UserRepository {
  constructor () {
    mongoose.connect('mongodb://localhost:27017/graphql', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  async create(user: User): Promise<User> {
    const { email, password, name } = await MongooseUser.create(user)
    return new User(email, password, name)
  }

  async delete(email: string): Promise<void> {
    await MongooseUser.findByIdAndDelete(email)
  }

  async update(user: User): Promise<User> {
    const { email, password, name } = await MongooseUser.findOneAndUpdate(user, { new: true })
    return new User(email, password, name)
  }

  async getByEmail(emailUser: string): Promise<User> {
    const { email, password, name } = await MongooseUser.findById(emailUser)
    return new User(email, password, name)
  }
}
