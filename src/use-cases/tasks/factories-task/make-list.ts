import { PrismaTaskRepository } from "@/repositories/prisma/tasks-prisma-repository.js";
import { ListTasksUseCase } from "../list.js";

export function makeListTasks() {
	const tasksRepository = new PrismaTaskRepository();
	const listTasksUseCase = new ListTasksUseCase(tasksRepository);

	return listTasksUseCase;
}
