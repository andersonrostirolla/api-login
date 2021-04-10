import MongooseUserRepository from './MongooseUser'
import MemoryUser from './MemoryUser'
import { UserRepositoryPort } from '../../../../core/ports'

export default class UserRepository {
  constructor (public driver: string) {}

  get repository (): UserRepositoryPort {
    switch (this.driver) {
      case 'mongoose':
        return new MongooseUserRepository()

      case 'memory':
        return new MemoryUser()

      default:
        return new MemoryUser()
    }
  }
}
