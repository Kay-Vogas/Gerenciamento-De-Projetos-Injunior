import { PrismaProjectRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { ProjectCreateUseCase } from '../create.js'

export function makeCreateProject() {
  const projectsRepository = new PrismaProjectRepository()
  const projectCreateUseCase = new ProjectCreateUseCase(projectsRepository)

  return projectCreateUseCase
}
