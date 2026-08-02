import { UserPresenter } from "@/http/presenters/user-presenter.js";
import { makeAuthUser } from "@/use-cases/users/facotories-user/make-auth.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function AuthUser(request: FastifyRequest,reply: FastifyReply) {
    
    try{
        const authUserBodySchema = z.object({
            name: z.string().trim().min(1).max(100).optional(),
            email: z.email().trim().max(100).optional(),
            password: z.string().min(8)
        })

        const {name,email,password} = authUserBodySchema.parse(request.body)

        const authUserUseCase = makeAuthUser()
        const {user} = await authUserUseCase.execute({
            login: name ?? email!,
            password
        })

        const token = await reply.jwtSign({
            sub: user.id,
            role: user.role
        },{expiresIn:'1d'})

        return reply.status(200).send({
            token,
            user:UserPresenter.toHTTP(user)
        })

    }catch(error){

        throw error

    }

}