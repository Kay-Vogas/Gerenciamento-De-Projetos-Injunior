import type {
	ProjectStatistics,
	ProjectsRepository,
} from "@/repositories/projects-repository.js";

interface GetProjectsReportUseCaseResponse {
	report: ProjectStatistics[];
}

export class GetProjectsReportUseCase {
	constructor(private projectsRepository: ProjectsRepository) {}

	async execute(): Promise<GetProjectsReportUseCaseResponse> {
		const report = await this.projectsRepository.getProjectsStatistics();

		return { report };
	}
}
