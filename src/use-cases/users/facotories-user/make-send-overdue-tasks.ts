import { NodeMailer } from "@/infra/NodemailerMailProvider.js";
import { SendOverdueTasksDigestUseCase } from "../send-overdue-tasks-digest.js";
import { PrismaTaskUserRepository } from "@/repositories/prisma/relationships-prisma-repository.js";


export function makeSendOverdueTasksDigestUseCase() {
  return new SendOverdueTasksDigestUseCase(
    new PrismaTaskUserRepository(),
    new NodeMailer()
  );
}
