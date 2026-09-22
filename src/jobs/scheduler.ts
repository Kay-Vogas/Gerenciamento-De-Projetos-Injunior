import type { FastifyBaseLogger } from "fastify";
import type { Job } from "@/jobs/job.interface.js";

export class OverdueTasksJob implements Job {
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