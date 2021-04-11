import UserRepository from '../../../../../../src/infra/out/repositories/user'
import {
  DeleteUser,
  List,
  CreateUser
} from '../../../../../../src/core/usecase/user'
import User from '../../../../../../src/core/models/User'

describe('Delete', () => {
  const userRepository = new UserRepository('memory')
  const repository = userRepository.repository
  const createUser = new CreateUser(repository)
  const deleteUser = new DeleteUser(repository)
  const list = new List(repository)
  const user = new User('teste@teste.com', 'Senha123', 'teste')
  const user2 = new User('teste2@teste.com', 'Senha123', 'teste 2')
  createUser.execute(user)
  createUser.execute(user2)

  it('user correct', async () => {
    await deleteUser.execute(user2.email)
    const listUser = await list.execute()

    expect(listUser.find(findUser => findUser.email === user2.email)).toBe(undefined)
  })

  it('user incorrect error', async () => {
    expect.assertions(1)
    try {
      await deleteUser.execute(user2.name)
    } catch (e) {
      expect(e.message).toBe('Usuário não encontrado para deleção.')
    }
  })
})
