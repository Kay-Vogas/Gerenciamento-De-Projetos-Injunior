import { makeRecSenhaUseCase } from "@/use-cases/users/facotories-user/make-rec-senha.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function RecuperaSenha(request: FastifyRequest,reply: FastifyReply) {

    const bodySchema = z.object({
    email: z.string().email(),
  });

  const parsed = bodySchema.safeParse(request.body);

  if (!parsed.success) {
    return reply.status(400).send({ message: "E-mail inválido." });
  }

  try {
 
    const useCase = makeRecSenhaUseCase();
    await useCase.execute({ email: parsed.data.email });

    return reply.status(200).send({
      message: "Se o e-mail existir, você receberá as instruções.",
    });
  } catch (error) {
    request.log.error(error);
    return reply
      .status(500)
      .send({ message: "Não foi possível processar a solicitação." });
  }
}