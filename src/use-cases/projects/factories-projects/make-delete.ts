import { PrismaProjectRepository } from "@/repositories/prisma/projects-prisma-repository.js";
import { ProjectDeleteUseCase } from "../delete.js";

export function makeDeleteProject() {
  const projectsRepository = new PrismaProjectRepository();

  const projectDeleteUseCase = new ProjectDeleteUseCase(projectsRepository);

  return projectDeleteUseCase;
}