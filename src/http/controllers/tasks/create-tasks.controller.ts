import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCreateTask } from '@/use-cases/tasks/factories-task/make-create.js'

export async function CreateTask(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createTaskBodySchema = z.object({
      title: z.string().trim().min(1),
      description: z.string().trim().optional().nullable(),
      priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
      deadline: z.coerce.date(),
      projectId: z.string().uuid(),
    })

    const { title, description, priority, deadline, projectId } =
      createTaskBodySchema.parse(request.body)

    const taskUseCase = makeCreateTask()

    const { task } = await taskUseCase.execute({
      title,
      description: description ?? null,
      priority,
      deadline,
      projectId,
    })

    return reply.status(201).send({ task })
  } catch (error) {
    return reply
      .status(400)
      .send({ message: 'Erro ao criar uma nova tarefa', error })
  }
}
