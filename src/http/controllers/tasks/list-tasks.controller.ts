import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { redis } from "@/libs/redis.js";
import { makeListTasks } from "@/use-cases/tasks/factories-task/make-list.js";

const CACHE_KEY = "tasks:all";
const TTL_SECONDS = 60;

export async function ListTasks(request: FastifyRequest, reply: FastifyReply) {
	try {
		const listTasksQuerySchema = z.object({
			projectId: z.string().uuid().optional(),
			priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
			completed: z
				.enum(["true", "false"])
				.optional()
				.transform((val) =>
					val === "true" ? true : val === "false" ? false : undefined,
				),
		});

		const cached = await redis.get(CACHE_KEY);

		if (cached) {
			console.log("CACHE HIT");
			return listTasksQuerySchema.parse(JSON.parse(cached));
		}

		const { projectId, priority, completed } = listTasksQuerySchema.parse(
			request.query,
		);

		const listTasksUseCase = makeListTasks();
		const { tasks } = await listTasksUseCase.execute({
			projectId,
			priority,
			completed,
		});

		await redis.set(CACHE_KEY, JSON.stringify({ tasks }), "EX", TTL_SECONDS);

		return reply.status(200).send({ tasks });
	} catch (error) {
		return reply.status(400).send({ message: "Erro ao listar tarefas", error });
	}
}
