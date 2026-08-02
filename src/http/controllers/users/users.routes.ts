import type { FastifyInstance } from "fastify";
import { registerUser } from "./register-users.controller.js";
import { getUser } from "./get-user.controller.js"
import { listUsers } from "./list-users.controller.js";
import { updateUser } from "./update-user.controller.js";
import { deleteUser } from "./delete-user.controller.js";
import { AuthUser } from "./auth-user.controller.js";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { verifyUserRole } from "@/http/middlewares/verify-user-roles.js";

export async function userRoutes(app: FastifyInstance) {
    
    // "/auth"
    app.post('/register',registerUser)
    app.post('/login',AuthUser)

    // "/users"
    app.get('/:id',{onRequest:verifyJwt},getUser)
    app.get('/',{onRequest:verifyJwt},listUsers)
    app.patch('/:id',{onRequest:verifyUserRole(['ADMIN','USER'])},updateUser)
    app.delete('/:id',{onRequest:verifyJwt},deleteUser)

    // Projects 

    //Tasks

    // Relacionamentos

    // Relatório
}
