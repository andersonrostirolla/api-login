import UserRepository from '../../../../../../src/infra/out/repositories/user'
import { CreateUser } from '../../../../../../src/core/usecase/user'
import User from '../../../../../../src/core/models/User'

describe('Create', () => {
  const userRepository = new UserRepository('memory')
  const repository = userRepository.repository
  const create = new CreateUser(repository)

  it('user correct', async () => {
    const user = new User('teste@teste.com', 'teste123', 'anderson')
    expect(await create.execute(user)).toMatchObject(user)
  })

  it('user incorrect error', async () => {
    expect.assertions(1)
    try {
      const user = new User('teste@teste.com', 'teste123', '')
      await create.execute(user)
    } catch (e) {
      expect(e.message).toBe('Alguma informação esta faltando para o cadastro.')
    }
  })
})
