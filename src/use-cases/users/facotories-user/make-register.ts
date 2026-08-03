import { PrismaUserRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { RegisterUserUseCase } from '../register.js'

export function makeRegisterUser() {
  const userRepository = new PrismaUserRepository()
  const registerUserUseCase = new RegisterUserUseCase(userRepository)

  return registerUserUseCase
}
