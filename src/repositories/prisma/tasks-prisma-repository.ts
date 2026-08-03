import type { Prisma, Task } from '@/@types/prisma/client.js'
import type {
  FindAllTasksFilters,
  TasksRepository,
  TaskWithUsers,
} from '../tasks-repository.js'
import { prisma } from '@/libs/prisma.js'

export class PrismaTaskRepository implements TasksRepository {
  async create(data: Prisma.TaskUncheckedCreateInput) {
    const task = await prisma.task.create({
      data,
    })
    return task
  }

  async findById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: { id },
    })
    return task
  }

  async update(id: string, data: Prisma.TaskUncheckedUpdateInput) {
    const task = await prisma.task.update({
      where: { id },
      data,
    })
    return task
  }

  async delete(id: string) {
    const task = await prisma.task.delete({
      where: { id },
    })
    return task
  }

  async findByIdWithUsers(id: string): Promise<TaskWithUsers | null> {
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        taskUser: true,
      },
    })
    return task
  }

  async list(filters?: FindAllTasksFilters): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: filters?.projectId,
        completed: filters?.completed,
        priority: filters?.priority,
      },
    })
    return tasks
  }
}
