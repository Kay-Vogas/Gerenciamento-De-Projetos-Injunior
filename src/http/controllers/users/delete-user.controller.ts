import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteUser } from "@/use-cases/users/facotories-user/make-delete.js";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
	try {
		const deleteUserParamsSchema = z.object({
			id: z.string(),
		});

		const { id } = deleteUserParamsSchema.parse(request.params);

		await makeDeleteUser().execute({ id });

		return reply.status(204).send();
	} catch (error) {
		throw new Error(`Erro ai deletar seu Usuário,${error}`);
	}
}
