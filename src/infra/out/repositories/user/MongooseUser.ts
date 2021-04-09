import UserRepository from 'src/core/ports/UserRepositoryPort'
import User from '../../../../core/models/User'
import MongooseUser from '../../models/MongooseUser'
import {
  UserWithoutPassword,
  Login
} from '../../../../core/interfaces'
import mongoose from 'mongoose'

export default class MongooseUserRepository implements UserRepository {
  private port: string = '';

  constructor () {
    if (!process.env.MONGODB_URI?.includes('+srv')) {
      this.port = `:${process.env.MONGODB_PORT}`
    }
    mongoose.connect(`${process.env.MONGODB_URI}${this.port}/${process.env.MONGODB_DB}${process.env.MONGODB_OTHERPARAMS}`, {
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

  async recoverPassword(user: UserWithoutPassword): Promise<User> {
    const { email, password, name } = await MongooseUser.findOne({
      $and:[
        { name: user.name },
        { _id: user.email }
      ]
    })
    if (!email || !password || !name) {
      throw new Error('Informações não encontradas para o usuário solicitado.')
    }
    return new User(email, password, name)
  }

  async login(login: Login): Promise<User> {
    const { email, password, name } = await MongooseUser.findOne({
      $and:[
        { _id: login.email },
        { password: login.password }
      ]
    })
    if (!email || !password || !name) {
      throw new Error('Email ou senha incorretos!')
    }
    return new User(email, password, name)
  }
}
