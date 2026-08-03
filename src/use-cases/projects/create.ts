import type { Project } from '@/@types/prisma/client.js'
import type { ProjectsRepository } from '@/repositories/projects-repository.js'

interface ProjectCreateUseCaseRequest {
  name: string
  description: string | null
}

type ProjectCreateUseCaseResponse = {
  project: Project
}

export class ProjectCreateUseCase {
  constructor(private projectRepository: ProjectsRepository) {}

  async execute({
    name,
    description,
  }: ProjectCreateUseCaseRequest): Promise<ProjectCreateUseCaseResponse> {
    const project = await this.projectRepository.create({
      name,
      description,
    })

    return { project }
  }
}
