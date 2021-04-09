import { Command } from '../../../core/ports'
import User from '../../../core/models/User';

export default function (useCases: {
    create: Command<User, User>,
    update: Command<User, User>,
    delete: Command<string, void>,
    getByEmail: Command<string, User>
  }) {
  return {
    Query: {
      user: (_: any, { email }: any) => {
        return useCases.getByEmail.execute(email)
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