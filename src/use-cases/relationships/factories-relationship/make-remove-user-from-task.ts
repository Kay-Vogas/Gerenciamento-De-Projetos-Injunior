import { PrismaTaskUserRepository } from '@/repositories/prisma/relationships-prisma-repository.js'
import { RemoveUserFromTaskUseCase } from '../remove-user-from-task.js'

export function makeRemoveUserFromTask() {

  const taskUserRepository = new PrismaTaskUserRepository()
  const removeUserFromTaskUseCase = new RemoveUserFromTaskUseCase(taskUserRepository)

  return removeUserFromTaskUseCase
}