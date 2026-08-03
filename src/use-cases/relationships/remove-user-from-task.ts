import type { USER_ROLE } from "@/@types/prisma/client.js";
import type { TaskUserRepository } from "@/repositories/relationships-repository.js"

interface RemoveUserFromTaskUseCaseRequest {
    taskId: string;
    userIdToRemove: string;
    requestingUserRole: USER_ROLE;
}

export class RemoveUserFromTaskUseCase {
    constructor(private taskUserRepository: TaskUserRepository) {}

    async execute({ taskId, userIdToRemove, requestingUserRole }: RemoveUserFromTaskUseCaseRequest): Promise<void> {
        if (requestingUserRole !== 'ADMIN') {
            throw new Error('Não autorizado: Apenas administradores podem remover atribuições.');
        }

        const isAssigned = await this.taskUserRepository.findByTaskAndUser(taskId, userIdToRemove);
        
        if (!isAssigned) {
            throw new Error('O usuário não está atribuído a esta tarefa.');
        }

        await this.taskUserRepository.unassign(taskId, userIdToRemove);
    }
}