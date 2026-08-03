import { makeUpdateProject } from '@/use-cases/projects/factories-projects/make-update.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function UpdateProject(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const updateProjectParams = z.object({
      id: z.string(),
    })

    const { id } = updateProjectParams.parse(request.params)

    const updateProjectBodySchema = z.object({
      name: z.string().min(1).max(100).optional(),
      description: z.string().min(1).optional(),
    })

    const { name, description } = updateProjectBodySchema.parse(request.body)

    const updateProjectUseCase = makeUpdateProject()
    const project = await updateProjectUseCase.execute({
      id,
      name,
      description,
    })

    return reply.status(200).send({ project })
  } catch (error) {
    throw new Error(`Ocooreu um erro no update do Project ${error}`)
  }
}
