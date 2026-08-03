import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeListTasks } from '@/use-cases/tasks/factories-task/make-list.js'

export async function ListTasks(request: FastifyRequest, reply: FastifyReply) {
  try {
    const listTasksQuerySchema = z.object({
      projectId: z.string().uuid().optional(),
      priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
      completed: z
        .enum(['true', 'false'])
        .optional()
        .transform((val) =>
          val === 'true' ? true : val === 'false' ? false : undefined,
        ),
    })

    const { projectId, priority, completed } = listTasksQuerySchema.parse(
      request.query,
    )

    const listTasksUseCase = makeListTasks()
    const { tasks } = await listTasksUseCase.execute({
      projectId,
      priority,
      completed,
    })

    return reply.status(200).send({ tasks })
  } catch (error) {
    return reply.status(400).send({ message: 'Erro ao listar tarefas', error })
  }
}
