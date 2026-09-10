import { PrismaTaskRepository } from "@/repositories/prisma/tasks-prisma-repository.js";
import { TaskDeleteUseCase } from "../delete.js";

export function makeDeleteTask() {
	const tasksRepository = new PrismaTaskRepository();
	const taskDeleteUseCase = new TaskDeleteUseCase(tasksRepository);

	return taskDeleteUseCase;
}
