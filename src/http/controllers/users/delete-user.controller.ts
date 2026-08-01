import { makeDeleteUser } from "@/use-cases/users/facotories-user/make-delete.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function DeleteUser(request:FastifyRequest,reply:FastifyReply) {
    try{

        const deleteUserParamsSchema = z.object({
            id: z.string()
        }) 

        const {id} = deleteUserParamsSchema.parse(request.params)

        await makeDeleteUser().execute({id})

        return reply.status(200).send()

    }catch(error){
        throw new Error(`Erro ai deletar seu Usuário,${error}`)
    }
}