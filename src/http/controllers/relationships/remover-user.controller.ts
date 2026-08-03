import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRemoveUserFromTask } from "@/use-cases/relationships/factories-relationship/make-remove-user-from-task.js";

export async function RemoveUserFromTask(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({ 
        id: z.string().uuid(),
        userId: z.string().uuid()
    });

    try {
        const { id: taskId, userId } = paramsSchema.parse(request.params);
        
        const user = request.user as { role: 'ADMIN' | 'USER' };

        const removeUseCase = makeRemoveUserFromTask();
        await removeUseCase.execute({
            taskId,
            userIdToRemove: userId,
            requestingUserRole: user.role
        });

        return reply.status(204).send();
    } catch (error: any) {
        if (error.message.includes('Não autorizado')) {
            return reply.status(403).send({ message: error.message });
        }
        return reply.status(400).send({ message: 'Erro ao remover atribuição', error: error.message });
    }
}