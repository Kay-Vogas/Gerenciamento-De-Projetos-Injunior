import type { PRIORITY, Prisma, Task, TaskUser } from "@/@types/prisma/client.js";

export interface FindAllTasksFilters {
    projectId?: string;
    completed?: boolean;
    priority?: PRIORITY;
}

export type TaskWithUsers = Task & { taskUser: TaskUser[] };

export interface TasksRepository {
    create(data: Prisma.TaskUncheckedCreateInput): Promise<Task>;
    findById(id: string): Promise<Task | null>;
    update(id: string, data: Prisma.TaskUncheckedUpdateInput): Promise<Task>;
    delete(id: string): Promise<Task>;
    
    findByIdWithUsers(id: string): Promise<TaskWithUsers | null>;
    list(filters?: FindAllTasksFilters): Promise<Task[]>;
}