import type { TaskUser } from "@/@types/prisma/client.js";

export interface TaskUserRepository {
	assign(taskId: string, userId: string): Promise<TaskUser>;
	unassign(taskId: string, userId: string): Promise<void>;
	findByTaskAndUser(taskId: string, userId: string): Promise<TaskUser | null>;
}
