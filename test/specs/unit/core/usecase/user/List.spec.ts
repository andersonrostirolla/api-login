import UserRepository from '../../../../../../src/infra/out/repositories/user'
import {
  List,
  CreateUser
} from '../../../../../../src/core/usecase/user'
import User from '../../../../../../src/core/models/User'

describe('List', () => {
  const userRepository = new UserRepository('memory')
  const repository = userRepository.repository
  const createUser = new CreateUser(repository)
  const list = new List(repository)
  const user = new User('teste@teste.com', 'Senha123', 'teste')
  const user2 = new User('teste2@teste.com', 'Senha123', 'teste')
  createUser.execute(user)
  createUser.execute(user2)

  it('users correct', async () => {
    expect(await list.execute()).toMatchObject([user, user2])
  })
})
