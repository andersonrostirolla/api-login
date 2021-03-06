import UserRepository from 'src/core/ports/UserRepositoryPort'
import User from '../../../../core/models/User'
import { UserWithoutPassword, Login } from '../../../../core/interfaces'

interface TryLogin {
  email: string
  password: string
  qty: number
}

export default class MemoryUserRepository implements UserRepository {
  private users: User[] = []
  private logins: TryLogin[] = []

  async getByEmail (emailUser: string): Promise<User> {
    const user = this.users.find(({ email }) => email === emailUser)
    if (!user) {
      throw new Error('Nenhum email encontrado!')
    }
    return user
  }

  async create (user: User): Promise<User> {
    if (!user.email || !user.password || !user.name) {
      throw new Error('Alguma informação esta faltando para o cadastro.')
    }
    this.users.push(user)
    return user
  }

  async delete (email: string): Promise<void> {
    const lenghtUsers = this.users.length
    this.users = this.users.filter((user) => user.email !== email)
    if (lenghtUsers === this.users.length) {
      throw new Error('Usuário não encontrado para deleção.')
    }
  }

  async update (user: User): Promise<User> {
    let userUpdated = await this.getByEmail(user.email)
    const indexToUpdate = this.users.findIndex(
      (user) => user.email === userUpdated.email
    )
    userUpdated = {
      ...userUpdated,
      ...user
    }
    this.users[indexToUpdate] = userUpdated
    return new User(userUpdated.email, userUpdated.password, userUpdated.name)
  }

  async recoverPassword (user: UserWithoutPassword): Promise<User> {
    const userFind = this.users.find(
      ({ email, name }) => email === user.email && name === user.name
    )

    if (!userFind) {
      throw new Error('Informações não encontradas para o usuário solicitado.')
    }
    return new User(userFind.email, userFind.password, userFind.name)
  }

  async login (login: Login): Promise<User> {
    const userFind = this.users.find(
      ({ email, password }) =>
        email === login.email && password === login.password
    )

    if (!userFind) {
      const loginIndex = this.logins.findIndex(
        (loginFind) => loginFind.email === login.email
      )
      if (loginIndex >= 0) {
        this.logins[loginIndex].qty = Number(this.logins[loginIndex].qty) + 1
      }
      throw new Error('Email ou senha incorretos!')
    }
    return new User(userFind.email, userFind.password, userFind.name)
  }

  async tryLogin (login: Login): Promise<boolean> {
    const LIMIT_TRYLOGIN: string = process.env.LIMIT_TRYLOGIN || '3'
    const loginFind = this.logins.find(
      (loginFind) => loginFind.email === login.email
    )
    if (loginFind && loginFind.qty >= Number(LIMIT_TRYLOGIN)) {
      throw new Error(
        'Você tentou se autenticar mais de 3 vezes com a senha incorreta, usuário bloqueado!'
      )
    }
    if (!loginFind) {
      this.logins.push({
        ...login,
        qty: 0
      })
    }
    return true
  }

  async list (): Promise<User[]> {
    return this.users.map(({ email, password, name }) => new User(email, password, name))
  }
}
