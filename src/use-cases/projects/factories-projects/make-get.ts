import { PrismaProjectRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { ProjectGetUseCase } from '../get.js'

export function makeGetProject() {
  const projectsRepository = new PrismaProjectRepository()

  const projectGetUseCase = new ProjectGetUseCase(projectsRepository)

  return projectGetUseCase
}
