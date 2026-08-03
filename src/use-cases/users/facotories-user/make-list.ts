import { PrismaUserRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ListUserUseCase } from '../list.js'

export function makeListUser() {
  const userRepository = new PrismaUserRepository()
  const listUserUseCase = new ListUserUseCase(userRepository)

  return listUserUseCase
}
