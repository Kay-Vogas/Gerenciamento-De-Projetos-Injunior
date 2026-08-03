import { PrismaTaskUserRepository } from '@/repositories/prisma/relationships-prisma-repository.js'
import { AssignUserToTaskUseCase } from '../assing-user.js'

export function makeAssignUserToTask() {

  const taskUserRepository = new PrismaTaskUserRepository()
  const assignUserToTaskUseCase = new AssignUserToTaskUseCase(taskUserRepository)

  return assignUserToTaskUseCase
}