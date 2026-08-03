import { PrismaProjectRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { ProjectUpdateUseCase } from '../update.js'

export function makeUpdateProject() {
  const projectsRepository = new PrismaProjectRepository()

  const projectUpdateUseCase = new ProjectUpdateUseCase(projectsRepository)

  return projectUpdateUseCase
}
