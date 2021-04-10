import UserRepository from 'src/core/ports/UserRepositoryPort'
import User from '../../../../core/models/User'
import {
  MongooseUser,
  TryLogin
} from '../../models'
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
      useFindAndModify: false,
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
    const { email, password, name } = await MongooseUser.findByIdAndUpdate(user.email, { new: true })
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
    const userFind = await MongooseUser.findOne({
      $and:[
        { _id: login.email },
        { password: login.password }
      ]
    })
    if (!userFind?.email || !userFind?.password || !userFind?.name) {
      const newTryLogin = await TryLogin.findById(login.email)
      const newQty = (newTryLogin?.qty || 0) + 1
      await TryLogin.findByIdAndUpdate(login.email, { qty: newQty }, { new: true })
      throw new Error('Email ou senha incorretos!')
    }
    await TryLogin.findByIdAndUpdate(login.email, { qty: 0 }, { new: true })
    return new User(userFind?.email, userFind?.password, userFind?.name)
  }

  async tryLogin(login: Login): Promise<boolean> {
    const LIMIT_TRYLOGIN: string = process.env.LIMIT_TRYLOGIN || '3'
    const newTryLogin = await TryLogin.findById(login.email)
    if (newTryLogin?.qty >= Number(LIMIT_TRYLOGIN)) {
      throw new Error('Você tentou se autenticar mais de 3 vezes com a senha incorreta, usuário bloqueado!')
    }
    if (!newTryLogin?._id) {
      await TryLogin.create({
        ...login,
        qty: 0
      })
    }
    return true
  }
}
