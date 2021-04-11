import { ApolloServer } from 'apollo-server'
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
import path from 'path'
import GraphqlUserResolver from './infra/in/resolvers/GraphqlUser'
import {
  CreateUser,
  DeleteUser,
  UpdateUser,
  GetUserByEmail,
  RecoverPassword,
  Login,
  TryLogin,
  List
} from './core/usecase/user/'
import UserRepository from './infra/out/repositories/user'
import dotenv from 'dotenv'
dotenv.config()

interface DriverEntry {
  driver: string
}

const resolveInputModels = () => {
  const typesArr = fileLoader(
    path.join(__dirname, 'infra', 'in', 'models', '**', '*.gql')
  )
  return mergeTypes(typesArr)
}

const resolveInputResolvers = (config: DriverEntry) => {
  const userRepository = new UserRepository(config.driver)
  const repository = userRepository.repository
  const createUser = new CreateUser(repository)
  const deleteUser = new DeleteUser(repository)
  const updateUser = new UpdateUser(repository)
  const getUserByEmail = new GetUserByEmail(repository)
  const recoverPasswordUser = new RecoverPassword(repository)
  const loginUser = new Login(repository)
  const tryLoginApp = new TryLogin(repository)
  const listUsers = new List(repository)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userResolver: any = GraphqlUserResolver({
    create: createUser,
    delete: deleteUser,
    update: updateUser,
    getByEmail: getUserByEmail,
    recoverPassword: recoverPasswordUser,
    login: loginUser,
    tryLogin: tryLoginApp,
    list: listUsers
  })

  return mergeResolvers([userResolver])
}

const start = async (driver: DriverEntry) => {
  const server: ApolloServer = new ApolloServer({
    typeDefs: resolveInputModels(),
    resolvers: resolveInputResolvers(driver)
  })

  const PORT: string = process.env.PORT || '8080'
  server
    .listen(parseInt(PORT))
    .then(({ url }) => console.log(`Server started on ${url}`))
}

const driver = process.env.DRIVER || 'memory'

start({
  driver
}).catch((err) => {
  console.error(err)
})
