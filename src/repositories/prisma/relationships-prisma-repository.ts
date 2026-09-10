import { prisma } from "@/libs/prisma.js";
import type { TaskUserRepository } from "../relationships-repository.js";

export class PrismaTaskUserRepository implements TaskUserRepository {
	async assign(taskId: string, userId: string) {
		const taskUser = await prisma.taskUser.create({
			data: { taskId, userId },
		});
		return taskUser;
	}

	async unassign(taskId: string, userId: string) {
		// Usamos deleteMany porque a PK da tabela relacional pode não estar disponível facilmente nas rotas
		await prisma.taskUser.deleteMany({
			where: { taskId, userId },
		});
	}

	async findByTaskAndUser(taskId: string, userId: string) {
		return prisma.taskUser.findFirst({
			where: { taskId, userId },
		});
	}
}
