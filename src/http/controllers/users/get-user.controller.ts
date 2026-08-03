import { UserPresenter } from '@/http/presenters/user-presenter.js'
import { makeGetUser } from '@/use-cases/users/facotories-user/make-get.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserSchemaParams = z.object({
      id: z.string(),
    })

    const { id } = getUserSchemaParams.parse(request.params)

    const getUserUseCase = makeGetUser()
    const { user } = await getUserUseCase.execute({ id })

    return reply.status(200).send(UserPresenter.toHTTP(user))
  } catch (error) {
    throw new Error(`Erro ao puxar este usuário ${error}`)
  }
}
