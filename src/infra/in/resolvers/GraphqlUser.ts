import { Command } from '../../../core/ports'
import User from '../../../core/models/User'
import { UserWithoutPassword, Login } from '../../../core/interfaces'

interface UserInput {
  data: {
    email: string,
    password: string,
    name: string
  }
}

export default function (useCases: {
  create: Command<User, User>,
  update: Command<User, User>,
  delete: Command<string, void>,
  getByEmail: Command<string, User>,
  recoverPassword: Command<UserWithoutPassword, User>,
  login: Command<Login, User>,
  tryLogin: Command<Login, boolean>,
  list: Command<void, User[]>
}): unknown {
  return {
    Query: {
      user: (_: unknown, { email }: User) => useCases.getByEmail.execute(email),
      recoverPassword: (_: unknown, { email, name }: UserWithoutPassword) => useCases.recoverPassword.execute({ email, name }),
      login: (_: unknown, { email, password }: Login) => useCases.login.execute({ email, password }),
      tryLogin: (_: unknown, { email, password }: Login) => useCases.tryLogin.execute({ email, password }),
      listUsers: () => useCases.list.execute()
    },
    Mutation: {
      createUser: async (_: unknown, { data }: UserInput) => {
        const user = new User(data.email, data.password, data.name)
        return useCases.create.execute(user)
      },
      updateUser: async (_: unknown, { data }: UserInput) => {
        const user = new User(data.email, data.password, data.name)
        return useCases.update.execute(user)
      },
      deleteUser: async (_: unknown, { email }: User) => {
        useCases.delete.execute(email)
        return true
      }
    }
  }
}
