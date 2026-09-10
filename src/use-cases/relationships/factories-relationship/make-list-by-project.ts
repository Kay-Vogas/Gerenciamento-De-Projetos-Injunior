import { PrismaTaskRepository } from "@/repositories/prisma/tasks-prisma-repository.js";
import { ListTasksByProjectUseCase } from "../list-tasks-by-project.js";

export function makeListTasksByProject() {
	const tasksRepository = new PrismaTaskRepository();
	const listTasksByProjectUseCase = new ListTasksByProjectUseCase(
		tasksRepository,
	);

	return listTasksByProjectUseCase;
}
