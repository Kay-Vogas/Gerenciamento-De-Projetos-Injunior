import { PrismaTaskRepository } from "@/repositories/prisma/tasks-prisma-repository.js";
import { GetTaskByIdUseCase } from "../get.js";

export function makeGetTaskById() {
    
    const tasksRepository = new PrismaTaskRepository();
    const getTaskByIdUseCase = new GetTaskByIdUseCase(tasksRepository);
    
    return getTaskByIdUseCase;
}