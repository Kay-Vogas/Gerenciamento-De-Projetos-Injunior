import { verifyJwt } from '@/http/middlewares/verify-jwt.js'
import { verifyUserRole } from '@/http/middlewares/verify-user-roles.js'
import type { FastifyInstance } from 'fastify'
import { CreateTask } from './create-tasks.controller.js'
import { GetTaskById } from './get-tasks.controller.js'
import { UpdateTask } from './update-tasks.controller.js'
import { DeleteTask } from './delete-tasks.controller.js'
import { ListTasks } from './list-tasks.controller.js'
import { CompleteTask } from './complete-tasks.controller.js'
import { AssignUserToTask } from '../relationships/assing-user-task.controller.js'
import { RemoveUserFromTask } from '../relationships/remover-user.controller.js'

export async function TasksRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: verifyJwt }, CreateTask)
  app.get('/:id', { onRequest: verifyJwt }, GetTaskById)
  app.get('/',{onRequest:verifyJwt} ,ListTasks)
  app.patch('/:id', { onRequest: verifyJwt }, UpdateTask)
  app.patch('/:id/complete',{ onRequest: [verifyJwt,verifyUserRole(['ADMIN'])]},CompleteTask)
  app.delete('/:id', { onRequest: verifyUserRole(['ADMIN']) }, DeleteTask)

  // relationship

  app.post('/:id/assign', { onRequest: [verifyJwt, verifyUserRole(['ADMIN'])] }, AssignUserToTask)
  app.delete('/:id/assign/:userId', { onRequest: [verifyJwt, verifyUserRole(['ADMIN'])] }, RemoveUserFromTask)
}
