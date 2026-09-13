import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCompleteTask } from "@/use-cases/tasks/factories-task/make-complete.js";

export async function CompleteTask(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		const completeTaskParamsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = completeTaskParamsSchema.parse(request.params);

		const user = request.user as { sub: string; role: "ADMIN" | "USER" };

		const userId = user.sub;
		const userRole = user.role;

		const completeTaskUseCase = makeCompleteTask();

		const { task } = await completeTaskUseCase.execute({
			taskId: id,
			userId,
			userRole,
		});

		return reply.status(200).send({ task });
	} catch (error: unknown) {
		if (error instanceof Error && error.message.includes("Não autorizado")) {
			return reply.status(403).send({ message: error.message });
		}
	}
}
