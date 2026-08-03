import type { USER_ROLE } from '@/@types/prisma/enums.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(allowredRoles: USER_ROLE[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user as { sub: string; role: USER_ROLE }

    if (!allowredRoles.includes(role)) {
      return reply
        .status(403)
        .send({ message: 'Você não tem permissão para acessar este recurso' })
    }
  }
}
