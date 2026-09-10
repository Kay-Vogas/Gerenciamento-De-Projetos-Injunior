import { PrismaProjectRepository } from "@/repositories/prisma/projects-prisma-repository.js";
import { GetProjectsReportUseCase } from "../get-projects-report.js";

export function makeGetProjectsReport() {
	const projectsRepository = new PrismaProjectRepository();

	const getProjectsReportUseCase = new GetProjectsReportUseCase(
		projectsRepository,
	);

	return getProjectsReportUseCase;
}
