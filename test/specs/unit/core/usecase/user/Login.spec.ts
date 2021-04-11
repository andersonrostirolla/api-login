import UserRepository from '../../../../../../src/infra/out/repositories/user'
import {
  Login,
  CreateUser
} from '../../../../../../src/core/usecase/user'
import User from '../../../../../../src/core/models/User'

describe('List', () => {
  const userRepository = new UserRepository('memory')
  const repository = userRepository.repository
  const createUser = new CreateUser(repository)
  const login = new Login(repository)
  const user = new User('teste@teste.com', 'Senha123', 'teste')
  createUser.execute(user)

  it('login correct', async () => {
    expect(await login.execute({
      email: user.email,
      password: user.password
    })).toMatchObject(user)
  })

  it('login incorrect', async () => {
    expect.assertions(1)
    try {
      await login.execute({
        email: user.email,
        password: 'asdasd'
      })
    } catch (e) {
      expect(e.message).toBe('Email ou senha incorretos!')
    }
  })
})
