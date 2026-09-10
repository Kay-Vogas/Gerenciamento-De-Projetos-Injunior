import type { PRIORITY, Task } from "@/@types/prisma/client.js";
import type { TasksRepository } from "@/repositories/tasks-repository.js";

interface ListTasksUseCaseRequest {
	projectId?: string;
	completed?: boolean;
	priority?: PRIORITY;
}

interface ListTasksUseCaseResponse {
	tasks: Task[];
}

export class ListTasksUseCase {
	constructor(private tasksRepository: TasksRepository) {}

	async execute({
		projectId,
		completed,
		priority,
	}: ListTasksUseCaseRequest): Promise<ListTasksUseCaseResponse> {
		const tasks = await this.tasksRepository.list({
			projectId,
			completed,
			priority,
		});

		return { tasks };
	}
}
