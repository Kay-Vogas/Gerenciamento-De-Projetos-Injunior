import fastify from 'fastify'
import { appRoutes } from './http/controllers/routes.js'
import { env } from './env/index.js'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((error,_request,reply)=>{

  if(error instanceof ZodError){
    return reply.status(400).send({
      message:'Error na Validação',
      issues: error.format(),
    })

  }

  if(error instanceof SyntaxError){
    return reply.status(400).send({
      mesagge: 'O corpo da requesição não está no formato JSON válido, verifique a estrutura de dados enviados'
    })
  }

})