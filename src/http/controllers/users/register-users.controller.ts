import { UserPresenter } from '@/http/presenters/user-presenter.js'
import { makeRegisterUser } from '@/use-cases/users/facotories-user/make-register.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const registerUserBodySchema = z.object({
      name: z.string().trim().min(1).max(100),
      email: z.string().trim().max(100),
      password: z.string().min(8),
    })

    const { name, email, password } = registerUserBodySchema.parse(request.body)

    const registerUserUseCase = makeRegisterUser()
    const { user } = await registerUserUseCase.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send(UserPresenter.toHTTP(user))
  } catch (error) {
    throw new Error(`Erro ao registrar o seu usuário ${error}`)
  }
}
