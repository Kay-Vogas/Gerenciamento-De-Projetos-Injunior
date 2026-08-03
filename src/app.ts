import fastify from 'fastify'
import { appRoutes } from './http/controllers/routes.js'
import { env } from './env/index.js'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)
