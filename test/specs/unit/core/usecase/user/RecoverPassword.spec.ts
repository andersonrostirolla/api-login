import UserRepository from '../../../../../../src/infra/out/repositories/user'
import {
  CreateUser,
  RecoverPassword
} from '../../../../../../src/core/usecase/user'
import User from '../../../../../../src/core/models/User'

describe('RecoverPassword', () => {
  const userRepository = new UserRepository('memory')
  const repository = userRepository.repository
  const createUser = new CreateUser(repository)
  const recoverPassword = new RecoverPassword(repository)
  const user = new User('teste@teste.com', 'Senha123', 'teste')
  createUser.execute(user)

  it('user correct', async () => {
    expect(await recoverPassword.execute({
      email: user.email,
      name: user.name
    })).toMatchObject(user)
  })

  it('user incorrect', async () => {
    expect.assertions(1)
    try {
      await recoverPassword.execute({
        email: user.email,
        name: 'asdasd'
      })
    } catch (e) {
      expect(e.message).toBe('Informações não encontradas para o usuário solicitado.')
    }
  })
})
