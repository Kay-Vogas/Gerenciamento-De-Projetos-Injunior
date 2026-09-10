import type { Prisma, Project } from "@/@types/prisma/client.js";
import { prisma } from "@/libs/prisma.js";
import type {
	ProjectStatistics,
	ProjectsRepository,
} from "../projects-repository.js";

export class PrismaProjectRepository implements ProjectsRepository {
	async create(data: Prisma.ProjectCreateInput) {
		const project = await prisma.project.create({
			data,
		});

		return project;
	}

	async list() {
		const projects = await prisma.project.findMany();

		return projects;
	}

	async findBy(where: Prisma.ProjectWhereInput): Promise<Project | null> {
		const project = await prisma.project.findFirst({
			where,
			include: {
				tasks: true,
			},
		});

		return project;
	}

	async update(id: string, data: Prisma.ProjectUpdateInput) {
		return prisma.project.update({
			where: { id },
			data,
		});
	}

	async delete(id: string) {
		const hasTask = await prisma.task.findFirst({
			where: {
				projectId: id,
			},
			select: {
				id: true,
			},
		});

		if (hasTask) {
			throw new Error("Não é possível excluir um projeto que possui tarefas.");
		}

		return prisma.project.delete({
			where: {
				id,
			},
		});
	}

	async getProjectsStatistics(): Promise<ProjectStatistics[]> {
		const projects = await prisma.project.findMany({
			select: {
				id: true,
				name: true,
				status: true,
				tasks: {
					select: {
						completed: true,
					},
				},
			},
		});

		return projects.map((project) => ({
			id: project.id,
			name: project.name,
			status: project.status,
			totalTasks: project.tasks.length,
			completedTasks: project.tasks.filter((task) => task.completed).length,
		}));
	}
}
