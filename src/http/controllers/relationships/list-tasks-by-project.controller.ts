import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeListTasksByProject } from "@/use-cases/relationships/factories-relationship/make-list-by-project.js";
import { TaskPresenter } from "@/http/presenters/task-presenter.js";

export async function ListTasksByProject(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ id: z.string().uuid() });
    
    try {
        const { id } = paramsSchema.parse(request.params);
        const listUseCase = makeListTasksByProject();
        const { tasks } = await listUseCase.execute({ projectId: id });

        return reply.status(200).send({ tasks: TaskPresenter.toHTTP(tasks) });
    } catch (error) {
        return reply.status(400).send({ message: 'Erro ao listar tarefas do projeto', error });
    }
}