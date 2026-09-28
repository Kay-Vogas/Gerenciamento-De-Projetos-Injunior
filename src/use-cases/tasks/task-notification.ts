import { prisma } from "@/libs/prisma.js";

export async function buscarAtividadesProximas() {
	const agora = new Date();
	const em1Hora = new Date(agora.getTime() + 60 * 60 * 1000);

	return prisma.taskUser.findMany({
		where: {
			task: {
				deadline: { gte: agora, lte: em1Hora },
				completed: false,
				notified: false,
			},
		},
		include: { user: true, task: true },
	});
}
