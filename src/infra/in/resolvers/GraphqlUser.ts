import { Command } from '../../../core/ports'
import User from '../../../core/models/User';
import {
  UserWithoutPassword,
  Login
} from '../../../core/interfaces'

export default function (useCases: {
    create: Command<User, User>,
    update: Command<User, User>,
    delete: Command<string, void>,
    getByEmail: Command<string, User>,
    recoverPassword: Command<UserWithoutPassword, User>,
    login: Command<Login, User>,
    tryLogin: Command<Login, boolean>
  }) {
  return {
    Query: {
      user: (_: any, { email }: any) => {
        return useCases.getByEmail.execute(email)
      },
      recoverPassword: (_: any, { email, name }: UserWithoutPassword) => {
        return useCases.recoverPassword.execute({ email, name })
      },
      login: (_: any, { email, password }: Login) => {
        return useCases.login.execute({ email, password })
      },
      tryLogin: (_: any, { email, password }: Login) => {
        return useCases.tryLogin.execute({ email, password })
      }
    },
    Mutation: {
      createUser: async (_: any, { data }: any) => {
        const user = new User(data.email, data.password, data.name)
        return useCases.create.execute(user)
      },
      updateUser: async (_: any, { data }: any) => {
        const user = new User(data.email, data.password, data.name)
        return useCases.update.execute(user)
      },
      deleteUser: async (_: any, { email }: any) => {
        useCases.delete.execute(email)
        return true
      }
    }
  }
}