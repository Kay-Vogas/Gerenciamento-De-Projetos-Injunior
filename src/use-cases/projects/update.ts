import type {
  Prisma,
  Project,
} from "@/@types/prisma/client.js";
import type { ProjectsRepository } from "@/repositories/projects-repository.js";

interface ProjectUpdateUseCaseRequest {
  id: string;
  name?: string;
  description: string | undefined;
}

type ProjectUpdateUseCaseResponse = {
  project: Project;
};

export class ProjectUpdateUseCase {
  constructor(private projectRepository: ProjectsRepository) {}

  async execute({
    id,
    name,
    description,
  }: ProjectUpdateUseCaseRequest): Promise<ProjectUpdateUseCaseResponse> {
    const data: Prisma.ProjectUpdateInput = {};

    if (name !== undefined) {
        data.name = name;
    }
    if (description !== undefined) {
        data.description = description;
    }

    const project = await this.projectRepository.update(
      id,
      data
    );

    return {
      project,
    };
  }
}