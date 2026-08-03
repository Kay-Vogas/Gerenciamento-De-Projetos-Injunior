import type { FastifyReply, FastifyRequest } from 'fastify'
import fastifyJWT from '@fastify/jwt'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
