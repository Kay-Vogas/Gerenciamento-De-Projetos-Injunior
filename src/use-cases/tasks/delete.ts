import type { TasksRepository } from '@/repositories/tasks-repository.js'

interface TaskDeleteUseCaseRequest {
  id: string
}

export class TaskDeleteUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ id }: TaskDeleteUseCaseRequest): Promise<void> {
    const taskExists = await this.tasksRepository.findById(id)

    if (!taskExists) {
      throw new Error('Tarefa não encontrada')
    }

    await this.tasksRepository.delete(id)
  }
}
