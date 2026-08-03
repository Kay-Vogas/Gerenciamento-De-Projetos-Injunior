import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeListTasksByUser } from "@/use-cases/relationships/factories-relationship/make-list-by-users.js"
import { TaskPresenter } from "@/http/presenters/task-presenter.js"

export async function ListTasksByUser(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ id: z.string().uuid() });
    
    try {
        const { id } = paramsSchema.parse(request.params);
        const listUseCase = makeListTasksByUser();
        const { tasks } = await listUseCase.execute({ userId: id });

        return reply.status(200).send({ tasks: TaskPresenter.toHTTP(tasks) });
    } catch (error) {
        return reply.status(400).send({ message: 'Erro ao listar tarefas do usuário', error });
    }
}