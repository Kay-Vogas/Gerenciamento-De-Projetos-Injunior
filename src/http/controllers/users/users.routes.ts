import type { FastifyInstance } from "fastify";
import { RegisterUser } from "./register-users.controller.js";
import { GetUser } from "./get-user.controller.js"
import { ListUsers } from "./list-users.controller.js";
import { UpdateUser } from "./update-user.controller.js";
import { DeleteUser } from "./delete-user.controller.js";

export async function userRoutes(app: FastifyInstance) {
    
    app.post('/',RegisterUser)
    app.get('/:id',GetUser)
    app.get('/',ListUsers)
    app.patch('/:id',UpdateUser)
    app.delete('/:id',DeleteUser)
}
