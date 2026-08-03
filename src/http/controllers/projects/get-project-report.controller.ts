import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetProjectsReport } from "@/use-cases/projects/factories-projects/make-get-projects-report.js";

export async function GetProjectsReport(_request: FastifyRequest, reply: FastifyReply) {
    const getProjectsReportUseCase = makeGetProjectsReport();
    
    const { report } = await getProjectsReportUseCase.execute();

    return reply.status(200).send({ report });
}