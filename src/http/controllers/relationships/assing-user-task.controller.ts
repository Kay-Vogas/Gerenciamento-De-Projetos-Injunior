import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeAssignUserToTask } from "@/use-cases/relationships/factories-relationship/make-assing-user.js"

export async function AssignUserToTask(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ id: z.string().uuid() });
    const bodySchema = z.object({ userId: z.string().uuid() });

    try {
        const { id: taskId } = paramsSchema.parse(request.params);
        const { userId } = bodySchema.parse(request.body);
        
        const user = request.user as { role: 'ADMIN' | 'USER' };

        const assignUseCase = makeAssignUserToTask();
        await assignUseCase.execute({
            taskId,
            userIdToAssign: userId,
            requestingUserRole: user.role
        });

        return reply.status(201).send();
    } catch (error: any) {
        if (error.message.includes('Não autorizado')) {
            return reply.status(403).send({ message: error.message });
        }
        return reply.status(400).send({ message: 'Erro ao atribuir usuário', error: error.message });
    }
}