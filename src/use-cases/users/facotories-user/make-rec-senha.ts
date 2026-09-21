import { app } from "@/app.js";
import { FastifyJwtTokenProvider } from "@/http/middlewares/fastify-jwt-token-provider.js";
import { NodeMailer } from "@/infra/NodemailerMailProvider.js";
import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { RecSenhaUseCase } from "../rec-senha.js";

export function makeRecSenhaUseCase() {
  const userRepository = new PrismaUserRepository();
  const tokenProvider = new FastifyJwtTokenProvider(app);
  const sendEmail = new NodeMailer();

  return new RecSenhaUseCase(userRepository, tokenProvider, sendEmail);
}