import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetProject } from "@/use-cases/projects/factories-projects/make-get.js";

export async function GetProject(request: FastifyRequest, reply: FastifyReply) {
	try {
		const getProjectSchemaParams = z.object({
			id: z.string(),
		});

		const { id } = getProjectSchemaParams.parse(request.params);

		const getProjectUseCase = makeGetProject();
		const project = await getProjectUseCase.execute({ id });

		return reply.status(200).send({ project });
	} catch (error) {
		throw new Error(`Erro ao puxar este usuário ${error}`);
	}
}
