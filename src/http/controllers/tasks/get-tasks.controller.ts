import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeGetTaskById } from '@/use-cases/tasks/factories-task/make-get.js'

export async function GetTaskById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getTaskParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTaskParamsSchema.parse(request.params)

    const getTaskUseCase = makeGetTaskById()
    const { task } = await getTaskUseCase.execute({ id })

    return reply.status(200).send({ task })
  } catch (error) {
    return reply.status(404).send({ message: 'Tarefa não encontrada', error })
  }
}
