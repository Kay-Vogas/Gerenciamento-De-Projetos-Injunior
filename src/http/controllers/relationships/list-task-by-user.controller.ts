import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { TaskPresenter } from "@/http/presenters/task-presenter.js";
import { makeListTasksByUser } from "@/use-cases/relationships/factories-relationship/make-list-by-users.js";

export async function ListTasksByUser(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const paramsSchema = z.object({ id: z.string().uuid() });

	try {
		const { id } = paramsSchema.parse(request.params);
		const listUseCase = makeListTasksByUser();
		const { tasks } = await listUseCase.execute({ userId: id });

		return reply.status(200).send({ tasks: TaskPresenter.toHTTP(tasks) });
	} catch (error: unknown) {
		if (error instanceof Error && error.message.includes("Não autorizado")) {
			return reply.status(403).send({ message: error.message });
		}
	}
}
