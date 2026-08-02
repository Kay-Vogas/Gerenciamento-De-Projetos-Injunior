import { UserPresenter } from "@/http/presenters/user-presenter.js";
import { makeListUser } from "@/use-cases/users/facotories-user/make-list.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
  try {

    const listUsersUseCase = makeListUser();
    const { users } = await listUsersUseCase.execute();

    return reply.status(200).send(UserPresenter.toHTTP(users));
  
} catch (error) {

    throw new Error(`Erro ao puxar este usuário ${error}`);
  }
}
