import type { Task } from "@/@types/prisma/client.js";
import type { TasksRepository } from "@/repositories/tasks-repository.js";

interface ListTasksByUserUseCaseRequest {
	userId: string;
}
interface ListTasksByUserUseCaseResponse {
	tasks: Task[];
}

export class ListTasksByUserUseCase {
	constructor(private tasksRepository: TasksRepository) {}

	async execute({
		userId,
	}: ListTasksByUserUseCaseRequest): Promise<ListTasksByUserUseCaseResponse> {
		const tasks = await this.tasksRepository.findManyByUserId(userId);
		return { tasks };
	}
}
