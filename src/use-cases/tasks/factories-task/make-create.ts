import { PrismaTaskRepository } from "@/repositories/prisma/tasks-prisma-repository.js";
import { TaskCreateUseCase } from "../create.js";

export function makeCreateTask() {
    
    const tasksRepository = new PrismaTaskRepository();
    const taskCreateUseCase = new TaskCreateUseCase(tasksRepository);
    
    return taskCreateUseCase;
}