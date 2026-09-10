import type { USER_ROLE } from "@/@types/prisma/client.js";
import type { TaskUserRepository } from "@/repositories/relationships-repository.js";

interface AssignUserToTaskUseCaseRequest {
	taskId: string;
	userIdToAssign: string;
	requestingUserRole: USER_ROLE;
}

export class AssignUserToTaskUseCase {
	constructor(private taskUserRepository: TaskUserRepository) {}

	async execute({
		taskId,
		userIdToAssign,
		requestingUserRole,
	}: AssignUserToTaskUseCaseRequest): Promise<void> {
		if (requestingUserRole !== "ADMIN") {
			throw new Error(
				"Não autorizado: Apenas administradores podem atribuir tarefas.",
			);
		}

		const alreadyAssigned = await this.taskUserRepository.findByTaskAndUser(
			taskId,
			userIdToAssign,
		);

		if (alreadyAssigned) {
			throw new Error("O usuário já está atribuído a esta tarefa.");
		}

		await this.taskUserRepository.assign(taskId, userIdToAssign);
	}
}
