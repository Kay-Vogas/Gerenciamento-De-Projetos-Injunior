import { UserPresenter } from "@/http/presenters/user-presenter.js";
import { makeUpdateUser } from "@/use-cases/users/facotories-user/make-update.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z, { email, string } from "zod";

export async function UpdateUser(request:FastifyRequest,reply:FastifyReply) {
    
    try{

        const updateUserParamsSchema = z.object({
            id: z.string()
        })

        const {id} = updateUserParamsSchema.parse(request.params)

        const updateUserBodySchema = z.object({
            name: z.string().trim().min(1).max(100).optional(),
            email: z.email().trim().max(100).optional()
        })

        const {name,email} = updateUserBodySchema.parse(request.body)

        const updateUserUseCase = makeUpdateUser()
        const {user} = await updateUserUseCase.execute({
            id,
            name,
            email
        }) 

        return reply.status(202).send(UserPresenter.toHTTP(user))

    }catch(error){

    }
}