import { PrismaUserRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { GetUserUseCase } from '../get.js'

export function makeGetUser() {
  const userRepository = new PrismaUserRepository()
  const getUserUseCase = new GetUserUseCase(userRepository)

  return getUserUseCase
}
