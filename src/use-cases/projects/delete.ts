import type { ProjectsRepository } from "@/repositories/projects-repository.js";

interface ProjectDeleteUseCaseRequest {
	id: string;
}

export class ProjectDeleteUseCase {
	constructor(private projectRepository: ProjectsRepository) {}

	async execute({ id }: ProjectDeleteUseCaseRequest) {
		const project = await this.projectRepository.findBy({ id });

		if (!project) {
			throw new Error("Projeto não encontrado no Sistema.");
		}

		await this.projectRepository.delete(id);
	}
}
