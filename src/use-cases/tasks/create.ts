import type { PRIORITY, Task } from "@/@types/prisma/client.js";
import type { TasksRepository } from "@/repositories/tasks-repository.js";

interface TaskCreateUseCaseRequest {
    title: string;
    description: string | null;
    priority: PRIORITY;
    deadline: Date;
    projectId: string;
}

interface TaskCreateUseCaseResponse {
    task: Task;
}

export class TaskCreateUseCase {
    constructor(private tasksRepository: TasksRepository) {}

    async execute({
        title,
        description,
        priority,
        deadline,
        projectId
    }: TaskCreateUseCaseRequest): Promise<TaskCreateUseCaseResponse> {
        const task = await this.tasksRepository.create({
            title,
            description,
            priority,
            deadline,
            projectId
        });

        return { task };
    }
}