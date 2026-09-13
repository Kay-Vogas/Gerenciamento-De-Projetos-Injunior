import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateProject } from "@/use-cases/projects/factories-projects/make-create.js";

export async function CreateProject(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		const createProjectBodySchema = z.object({
			name: z.string().trim().min(1),
			description: z.string().trim(),
		});

		const { name, description } = createProjectBodySchema.parse(request.body);

		const projectUseCase = makeCreateProject();
		const project = projectUseCase.execute({
			name,
			description,
		});

		return reply.status(201).send({ project });
	} catch (_error) {
		throw new Error("Erro ao criar um projeto novo");
	}
}
