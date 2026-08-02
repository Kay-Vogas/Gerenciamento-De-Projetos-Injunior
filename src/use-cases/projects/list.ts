import type { Project } from "@/@types/prisma/client.js";
import type { ProjectsRepository } from "@/repositories/projects-repository.js";

type ProjectListUseCaseResponse = {
  projects: Project[];
};

export class ProjectListUseCase {
  constructor(private projectRepository: ProjectsRepository) {}

  async execute(): Promise<ProjectListUseCaseResponse> {
    const projects = await this.projectRepository.list();

    if(!projects) {
        throw new Error("Nenhum projeto registrado")
    }

    return {projects};
  }
}