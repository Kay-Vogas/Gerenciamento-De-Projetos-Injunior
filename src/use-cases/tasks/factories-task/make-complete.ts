import { PrismaTaskRepository } from '@/repositories/prisma/tasks-prisma-repository.js'
import { CompleteTaskUseCase } from '../complete.js'

export function makeCompleteTask() {
  const tasksRepository = new PrismaTaskRepository()
  const completeTaskUseCase = new CompleteTaskUseCase(tasksRepository)

  return completeTaskUseCase
}
