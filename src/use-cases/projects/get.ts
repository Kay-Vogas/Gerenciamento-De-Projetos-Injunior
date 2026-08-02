import type {Project} from "@/@types/prisma/client.js";
import type { ProjectsRepository } from "@/repositories/projects-repository.js";

interface ProjectGetUseCaseRequest {
  id: string
}

type ProjectGetUseCaseResponse = {
  project: Project | null;
};

export class ProjectGetUseCase {
  constructor(private projectRepository: ProjectsRepository) {}

  async execute({
    id,
  }: ProjectGetUseCaseRequest): Promise<ProjectGetUseCaseResponse> {
    
    const project = await this.projectRepository.findBy({id});

    if(!project){
        throw new Error('Projeto não encontrado no sistema.')
    }

    return {
      project,
    };
  }
}