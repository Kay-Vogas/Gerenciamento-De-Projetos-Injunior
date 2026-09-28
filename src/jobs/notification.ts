import { NodemailerMailProvider } from "@/infra/NodemailerMailProvider.js";
import { prisma } from "@/libs/prisma.js";

export async function notifyTasksDueSoon() {
	const now = new Date();
	const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);

	const assignments = await prisma.taskUser.findMany({
		where: {
			task: {
				deadline: { gte: now, lte: inOneHour },
				completed: false,
				notified: false,
			},
		},
		include: { user: true, task: true },
	});

	const mailer = new NodemailerMailProvider();
	for (const { user, task } of assignments) {
		await mailer.send({
			to: user.email,
			subject: `Lembrete: ${task.title}`,
			html: `
				<p>Sua tarefa <strong>${task.title}</strong> está vencendo!</p>
				<p>Prazo: ${task.deadline.toLocaleString("pt-BR")}</p>
			`,
		});
	}

	const taskIds = [...new Set(assignments.map((a) => a.task.id))];

	await prisma.task.updateMany({
		where: { id: { in: taskIds } },
		data: { notified: true },
	});

	console.log(`[CRON] ${taskIds.length} tarefa(s) notificada(s).`);
}
