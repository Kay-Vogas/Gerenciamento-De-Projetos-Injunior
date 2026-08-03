import type { Task } from "@/@types/prisma/client.js";
import type { TasksRepository } from "@/repositories/tasks-repository.js";

interface ListTasksByProjectUseCaseRequest { projectId: string; }
interface ListTasksByProjectUseCaseResponse { tasks: Task[]; }

export class ListTasksByProjectUseCase {
    constructor(private tasksRepository: TasksRepository) {}

    async execute({ projectId }: ListTasksByProjectUseCaseRequest): Promise<ListTasksByProjectUseCaseResponse> {
        const tasks = await this.tasksRepository.findManyByProjectId(projectId);
        return { tasks };
    }
}