import { ApolloServer } from 'apollo-server'
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
import path from 'path'
import GraphqlUserResolver from './infra/in/resolvers/GraphqlUser'
import {
  CreateUser,
  DeleteUser,
  UpdateUser,
  GetUserByEmail
} from './core/usecase/user/'
import UserRepository from './infra/out/repositories/user'

interface DriverEntry {
  driver: string;
}

const resolveInputModels = () => {
  const typesArr = fileLoader(path.join(__dirname, 'infra', 'in', 'models', '**', '*.gql'))
  return mergeTypes(typesArr)
}

const resolveInputResolvers = (config: DriverEntry) => {
  const userRepository = new UserRepository(config.driver)
  const repository = userRepository.repository
  const createUser = new CreateUser(repository)
  const deleteUser = new DeleteUser(repository)
  const updateUser = new UpdateUser(repository)
  const getUserByEmail = new GetUserByEmail(repository)
  const userResolver = GraphqlUserResolver({
    create: createUser,
    delete: deleteUser,
    update: updateUser,
    getByEmail: getUserByEmail
  })

  return mergeResolvers([ userResolver ])
}

const start = async (driver: DriverEntry) => {
  const server: ApolloServer = new ApolloServer({
    typeDefs: resolveInputModels(),
    resolvers: resolveInputResolvers(driver)
  });

  const port: string = process.env.PORT || '8080'
  server.listen(parseInt(port)).then(({ url }) => console.log(`Server started on ${url}`))
};

start({
  driver: 'mongoose'
}).catch((err) => {
  console.error(err);
});
