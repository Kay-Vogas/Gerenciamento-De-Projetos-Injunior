import type { Prisma, Project, STATUS } from "@/@types/prisma/client.js";

export interface ProjectStatistics {
	id: string;
	name: string;
	status: STATUS;
	totalTasks: number;
	completedTasks: number;
}

export interface ProjectsRepository {
	create(data: Prisma.ProjectCreateInput): Promise<Project>;
	list(): Promise<Project[]>;
	findBy(where: Prisma.ProjectWhereInput): Promise<Project | null>;
	update(id: string, data: Prisma.ProjectUpdateInput): Promise<Project>;
	delete(id: string): Promise<Project>;

	getProjectsStatistics(): Promise<ProjectStatistics[]>;
}
