import UserRepository from '../../../../../../src/infra/out/repositories/user'
import {
  CreateUser,
  TryLogin,
  Login
} from '../../../../../../src/core/usecase/user'
import User from '../../../../../../src/core/models/User'

describe('TryLogin', () => {
  const userRepository = new UserRepository('memory')
  const repository = userRepository.repository
  const createUser = new CreateUser(repository)
  const tryLogin = new TryLogin(repository)
  const login = new Login(repository)
  const user = new User('teste@teste.com', 'Senha123', 'teste')
  createUser.execute(user)

  it('tryLogin correct', async () => {
    expect(await tryLogin.execute({
      email: user.email,
      password: user.password
    })).toBe(true)
  })

  it('tryLogin incorrect', async () => {
    const loginUser = {
      email: user.email,
      password: 'asdasd'
    }
    expect.assertions(1)
    try {
      await tryLogin.execute(loginUser)
      await login.execute(loginUser)
      await tryLogin.execute(loginUser)
      await login.execute(loginUser)
      await tryLogin.execute(loginUser)
      await login.execute(loginUser)
      await tryLogin.execute(loginUser)
      await login.execute(loginUser)
      await tryLogin.execute(loginUser)
    } catch (e) {
      expect(e.message).toBe('Email ou senha incorretos!')
    }
  })
})
