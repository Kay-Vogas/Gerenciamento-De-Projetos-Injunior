import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteTask } from "@/use-cases/tasks/factories-task/make-delete.js";

export async function DeleteTask(request: FastifyRequest, reply: FastifyReply) {
	try {
		const deleteTaskParamsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = deleteTaskParamsSchema.parse(request.params);

		const deleteTaskUseCase = makeDeleteTask();
		await deleteTaskUseCase.execute({ id });

		return reply.status(204).send();
	} catch (error) {
		return reply
			.status(400)
			.send({ message: "Erro ao deletar a tarefa", error });
	}
}
