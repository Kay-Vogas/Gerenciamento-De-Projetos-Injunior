import type { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { verifyUserRole } from "@/http/middlewares/verify-user-roles.js";
import { ListTasksByUser } from "../relationships/list-task-by-user.controller.js";
import { AuthUser } from "./auth-user.controller.js";
import { deleteUser } from "./delete-user.controller.js";
import { getUser } from "./get-user.controller.js";
import { listUsers } from "./list-users.controller.js";
import { registerUser } from "./register-users.controller.js";
import { updateUser } from "./update-user.controller.js";

export async function userRoutes(app: FastifyInstance) {
	app.post("/register", registerUser);
	app.post("/login", AuthUser);

	app.get("/:id", { onRequest: verifyJwt }, getUser);
	app.get("/", { onRequest: verifyJwt }, listUsers);
	app.patch(
		"/:id",
		{ onRequest: verifyUserRole(["ADMIN", "USER"]) },
		updateUser,
	);
	app.delete("/:id", { onRequest: verifyJwt }, deleteUser);

	app.get("/:id/tasks", { onRequest: verifyJwt }, ListTasksByUser);

	// app.patch("")
}
