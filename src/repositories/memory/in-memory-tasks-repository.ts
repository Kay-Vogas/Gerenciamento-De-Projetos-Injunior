import type { Task } from "@/@types/prisma/client.js";
import type { TaskUncheckedCreateInput, TaskUncheckedUpdateInput } from "@/@types/prisma/models.js";

import type {
    FindAllTasksFilters,
  OverdueTask,
  TasksRepository,
  TaskWithUsers,
} from "@/repositories/tasks-repository.js";

interface StoredTask {
  id: string;
  title: string;
  dueDate: Date;
  status: string;
  projectName: string;
  assignee: { id: string; name: string; email: string };
}

 
export class InMemoryTasksRepository implements TasksRepository {
  create(data: TaskUncheckedCreateInput): Promise<Task> {
      throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Task | null> {
      throw new Error("Method not implemented.");
  }
  update(id: string, data: TaskUncheckedUpdateInput): Promise<Task> {
      throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Task> {
      throw new Error("Method not implemented.");
  }
  findByIdWithUsers(id: string): Promise<TaskWithUsers | null> {
      throw new Error("Method not implemented.");
  }
  list(filters?: FindAllTasksFilters): Promise<Task[]> {
      throw new Error("Method not implemented.");
  }
  findManyByProjectId(projectId: string): Promise<Task[]> {
      throw new Error("Method not implemented.");
  }
  findManyByUserId(userId: string): Promise<Task[]> {
      throw new Error("Method not implemented.");
  }
  public tasks: StoredTask[] = [];

  async findOverdue(referenceDate: Date): Promise<OverdueTask[]> {
    return this.tasks
      .filter((task) => task.status !== "DONE" && task.dueDate < referenceDate)
      .map(({ id, title, dueDate, projectName, assignee }) => ({
        id,
        title,
        dueDate,
        projectName,
        assignee,
      }))
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }
}
