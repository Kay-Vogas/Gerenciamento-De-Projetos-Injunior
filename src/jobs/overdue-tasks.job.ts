import type { FastifyBaseLogger } from "fastify";
import type { Job } from "@/jobs/job.interface.js";
import { makeSendOverdueTasksDigestUseCase } from "@/use-cases/users/facotories-user/make-send-overdue-tasks.js";

export class OverdueTask implements Job {
  readonly name = "overdue-tasks-digest";

  constructor(
    readonly schedule: string,
    private logger: FastifyBaseLogger,
  ) {}

  async handle(): Promise<void> {
    const useCase = makeSendOverdueTasksDigestUseCase();
    const result = await useCase.execute();

    this.logger.info(result, `[job:${this.name}] resumo da execução`);
  }
}
