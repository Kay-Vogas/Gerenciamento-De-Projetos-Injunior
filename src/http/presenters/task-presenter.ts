import type { Task, PRIORITY } from '@/@types/prisma/client.js'

type HTTPTask = {
  id: string
  title: string
  description: string | null
  priority: PRIORITY
  completed: boolean
  deadline: Date
  projectId: string
}

export class TaskPresenter {
  static toHTTP(task: Task): HTTPTask
  static toHTTP(tasks: Task[]): HTTPTask[]
  static toHTTP(input: Task | Task[]): HTTPTask | HTTPTask[] {
    if (Array.isArray(input)) {
      return input.map((task) => this.toHTTP(task))
    }

    return {
      id: input.id,
      title: input.title,
      description: input.description,
      priority: input.priority,
      completed: input.completed,
      deadline: input.deadline,
      projectId: input.projectId,
    }
  }
}