import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env/index.js";
import { appRoutes } from "./http/controllers/routes.js";

export const app = fastify();

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
});

app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: "Error na Validação",
			issues: error.format(),
		});
	}

	if (error instanceof SyntaxError) {
		return reply.status(400).send({
			mesagge:
				"O corpo da requesição não está no formato JSON válido, verifique a estrutura de dados enviados...",
		});
	}
});
