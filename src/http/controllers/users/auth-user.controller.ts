import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { UserPresenter } from "@/http/presenters/user-presenter.js";
import { makeAuthUser } from "@/use-cases/users/facotories-user/make-auth.js";

export async function AuthUser(request: FastifyRequest, reply: FastifyReply) {
	const authUserBodySchema = z.object({
		name: z.string().trim().min(1).max(100).optional(),
		email: z.email().trim().max(100).optional(),
		password: z.string().min(8),
	});

	const { name, email, password } = authUserBodySchema.parse(request.body);

	const authUserUseCase = makeAuthUser();
	const login = name ?? email;

	if (!login) {
		return reply.status(400).send({
			message: "Nome ou email é obrigatório",
		});
	}

	const { user } = await authUserUseCase.execute({
		login,
		password,
	});

	const token = await reply.jwtSign(
		{
			sub: user.id,
			role: user.role,
		},
		{ expiresIn: "1d" },
	);

	return reply.status(200).send({
		token,
		user: UserPresenter.toHTTP(user),
	});
}
