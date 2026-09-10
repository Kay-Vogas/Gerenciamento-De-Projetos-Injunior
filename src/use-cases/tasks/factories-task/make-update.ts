import { PrismaTaskRepository } from "@/repositories/prisma/tasks-prisma-repository.js";
import { TaskUpdateUseCase } from "../update.js";

export function makeUpdateTask() {
	const tasksRepository = new PrismaTaskRepository();
	const taskUpdateUseCase = new TaskUpdateUseCase(tasksRepository);

	return taskUpdateUseCase;
}
