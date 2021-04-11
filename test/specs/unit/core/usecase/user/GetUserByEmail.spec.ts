import UserRepository from '../../../../../../src/infra/out/repositories/user'
import {
  GetUserByEmail,
  CreateUser
} from '../../../../../../src/core/usecase/user'
import User from '../../../../../../src/core/models/User'

describe('GetUserByEmail', () => {
  const userRepository = new UserRepository('memory')
  const repository = userRepository.repository
  const createUser = new CreateUser(repository)
  const getUserByEmail = new GetUserByEmail(repository)
  const user = new User('teste@teste.com', 'Senha123', 'teste')
  createUser.execute(user)

  it('user correct', async () => {
    expect(await getUserByEmail.execute(user.email)).toMatchObject(user)
  })

  it('user incorrect error', async () => {
    expect.assertions(1)
    try {
      await getUserByEmail.execute(user.name)
    } catch (e) {
      expect(e.message).toBe('Nenhum email encontrado!')
    }
  })
})
