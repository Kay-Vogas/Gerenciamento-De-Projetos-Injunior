import type { FastifyInstance } from "fastify";
import { GetProjectsReport } from "@/http/controllers/projects/get-project-report.controller.js";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { verifyUserRole } from "@/http/middlewares/verify-user-roles.js";

export async function ReportsRoutes(app: FastifyInstance) {
	app.get(
		"/projects",
		{ onRequest: [verifyJwt, verifyUserRole(["ADMIN"])] },
		GetProjectsReport,
	);
}
