import type { FastifyBaseLogger } from "fastify";
import cron from "node-cron";
import type { Job } from "@/jobs/job.interface.js";

export type CronTask = ReturnType<typeof cron.schedule>;

export function startJobs(
  jobs: Job[],
  logger: FastifyBaseLogger,
  timezone: string,
): CronTask[] {
  return jobs.map((job) => {
    if (!cron.validate(job.schedule)) {
      throw new Error(
        `Expressão CRON inválida para o job "${job.name}": "${job.schedule}"`,
      );
    }

    const task = cron.schedule(
      job.schedule,
      async () => {
        logger.info(`[job:${job.name}] iniciando`);

        try {
          await job.handle();
          logger.info(`[job:${job.name}] finalizado`);
        } catch (error) {
          
          logger.error({ err: error }, `[job:${job.name}] falhou`);
        }
      },
      {
        name: job.name,
        timezone,
        noOverlap: true, 
      },
    );

    logger.info(
      `[job:${job.name}] agendado com "${job.schedule}" (${timezone})`,
    );

    return task;
  });
}