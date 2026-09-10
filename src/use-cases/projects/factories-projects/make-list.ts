import { PrismaProjectRepository } from "@/repositories/prisma/projects-prisma-repository.js";
import { ProjectListUseCase } from "../list.js";

export function makeListProject() {
	const projectsRepository = new PrismaProjectRepository();

	const projectListUseCase = new ProjectListUseCase(projectsRepository);

	return projectListUseCase;
}
