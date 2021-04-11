import UserRepository from '../../../../../../src/infra/out/repositories/user'
import {
  CreateUser,
  UpdateUser,
  GetUserByEmail
} from '../../../../../../src/core/usecase/user'
import User from '../../../../../../src/core/models/User'

describe('Update', () => {
  const userRepository = new UserRepository('memory')
  const repository = userRepository.repository
  const createUser = new CreateUser(repository)
  const update = new UpdateUser(repository)
  const getUserByEmail = new GetUserByEmail(repository)
  const user = new User('teste@teste.com', 'Senha123', 'teste')
  createUser.execute(user)

  it('user correct', async () => {
    expect(await update.execute({
      ...user,
      name: 'teste2'
    })).toMatchObject({
      ...user,
      name: 'teste2'
    })
  })

  it('user correct getUser', async () => {
    expect(await update.execute({
      ...user,
      name: 'teste2'
    })).toMatchObject(await getUserByEmail.execute(user.email))
  })
})
