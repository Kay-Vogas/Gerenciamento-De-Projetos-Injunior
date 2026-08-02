import type { FastifyInstance } from "fastify";
import { userRoutes } from "./users/users.routes.js";
import { ProjectsRoutes } from "./projects/projects.routes.js";

export async function appRoutes(app:FastifyInstance){

    app.register(userRoutes,{prefix: '/users'})
    app.register(userRoutes,{prefix:'/auth'})
    app.register(ProjectsRoutes,{prefix:'/projects'})
    
} 