import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateTask } from "@/use-cases/tasks/factories-task/make-update.js";

export async function UpdateTask(request: FastifyRequest, reply: FastifyReply) {
	try {
		const updateTaskParamsSchema = z.object({
			id: z.string().uuid(),
		});

		const updateTaskBodySchema = z.object({
			title: z.string().trim().min(1).optional(),
			description: z.string().trim().optional().nullable(),
			priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
			completed: z.boolean().optional(),
			deadline: z.coerce.date().optional(),
		});

		const { id } = updateTaskParamsSchema.parse(request.params);
		const data = updateTaskBodySchema.parse(request.body);

		const updateTaskUseCase = makeUpdateTask();

		const { task } = await updateTaskUseCase.execute({
			id,
			...data,
		});

		return reply.status(200).send({ task });
	} catch (error) {
		return reply
			.status(400)
			.send({ message: "Erro ao atualizar a tarefa", error });
	}
}
