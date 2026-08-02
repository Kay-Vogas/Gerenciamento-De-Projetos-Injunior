import type { PRIORITY, Task } from "@/@types/prisma/client.js";
import type { TasksRepository } from "@/repositories/tasks-repository.js";

interface TaskUpdateUseCaseRequest {
    id: string;
    title?: string;
    description?: string | null;
    priority?: PRIORITY;
    completed?: boolean;
    deadline?: Date;
}

interface TaskUpdateUseCaseResponse {
    task: Task;
}

export class TaskUpdateUseCase {
    constructor(private tasksRepository: TasksRepository) {}

    async execute({
        id,
        title,
        description,
        priority,
        completed,
        deadline
    }: TaskUpdateUseCaseRequest): Promise<TaskUpdateUseCaseResponse> {

        const taskExists = await this.tasksRepository.findById(id);
        
        if (!taskExists) {
            throw new Error('Tarefa não encontrada');
        }

        const task = await this.tasksRepository.update(id, {
            title,
            description,
            priority,
            completed,
            deadline
        });

        return { task };
    }
}