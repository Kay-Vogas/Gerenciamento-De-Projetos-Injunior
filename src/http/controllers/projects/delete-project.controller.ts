import { makeDeleteProject } from "@/use-cases/projects/factories-projects/make-delete.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteProject(request: FastifyRequest,reply: FastifyReply) {
  try {
    const deleteProjectParamsSchema = z.object({
      id: z.string(),
    });

    const { id } = deleteProjectParamsSchema.parse(request.params);

    await makeDeleteProject().execute({ id });

    return reply.status(204).send();
  } catch (error) {
    throw new Error(`Erro ao deletar o projeto: ${error}`);
  }
}