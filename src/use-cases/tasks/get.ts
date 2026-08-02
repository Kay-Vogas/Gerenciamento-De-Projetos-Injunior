import type { Task } from "@/@types/prisma/client.js";
import type { TasksRepository } from "@/repositories/tasks-repository.js";

interface GetTaskByIdUseCaseRequest {
    id: string;
}

interface GetTaskByIdUseCaseResponse {
    task: Task;
}

export class GetTaskByIdUseCase {
    constructor(private tasksRepository: TasksRepository) {}

    async execute({ id }: GetTaskByIdUseCaseRequest): Promise<GetTaskByIdUseCaseResponse> {
        const task = await this.tasksRepository.findById(id);

        if (!task) {
            throw new Error('Tarefa não encontrada');
        }

        return { task };
    }
}