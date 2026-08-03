import { makeListProject } from '@/use-cases/projects/factories-projects/make-list.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listProject(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const listProjectUseCase = makeListProject()
    const project = await listProjectUseCase.execute()

    return reply.status(200).send({ project })
  } catch (eror) {
    throw new Error('Ocorreu algum problema na listagem dos Projetos.')
  }
}
