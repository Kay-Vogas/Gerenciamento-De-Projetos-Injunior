import { PrismaTaskRepository } from "@/repositories/prisma/tasks-prisma-repository.js";
import { ListTasksByUserUseCase } from "../list-tasks-by-user.js";

export function makeListTasksByUser() {
	const tasksRepository = new PrismaTaskRepository();

	const listTasksByUserUseCase = new ListTasksByUserUseCase(tasksRepository);

	return listTasksByUserUseCase;
}
