import type { Task, USER_ROLE } from "@/@types/prisma/client.js";
import type { TasksRepository } from "@/repositories/tasks-repository.js";
import { NotAllowedError } from "../error/not-allow-error.js";
import { ResourceNotFoundError } from "../error/resource-not-found-error.js";

interface CompleteTaskUseCaseRequest {
	taskId: string;
	userId: string;
	userRole: USER_ROLE;
}

interface CompleteTaskUseCaseResponse {
	task: Task;
}

export class CompleteTaskUseCase {
	constructor(private tasksRepository: TasksRepository) {}

	async execute({
		taskId,
		userId,
		userRole,
	}: CompleteTaskUseCaseRequest): Promise<CompleteTaskUseCaseResponse> {
		const task = await this.tasksRepository.findByIdWithUsers(taskId);

		if (!task) {
			throw new ResourceNotFoundError();
		}

		const isAdmin = userRole === "ADMIN";

		const isAssigned = task.taskUser.some((tu) => tu.userId === userId);

		if (!isAdmin && !isAssigned) {
			throw new NotAllowedError();
		}

		const updatedTask = await this.tasksRepository.update(taskId, {
			completed: true,
		});

		return { task: updatedTask };
	}
}
