import type { FastifyInstance } from "fastify";
import { CreateProject } from "./create-project.controller.js";
import { GetProject } from "./get-project.controller.js";
import { listProject } from "./list-project.controller.js";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { UpdateProject } from "./update-project.controller.js";
import { deleteProject } from "./delete-project.controller.js";
import { verifyUserRole } from "@/http/middlewares/verify-user-roles.js";

export async function ProjectsRoutes(app:FastifyInstance) {
    
    app.post('/',{onRequest:verifyJwt}, CreateProject)
    app.get('/:id',{onRequest:verifyJwt} ,GetProject)
    app.get('/',{onRequest:verifyJwt} ,listProject)
    app.patch('/:id',{onRequest:verifyJwt},UpdateProject)
    app.delete('/:id',{onRequest:verifyUserRole(['ADMIN'])},deleteProject)
}