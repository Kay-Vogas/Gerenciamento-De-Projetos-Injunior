import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { AuthUserUseCase } from "../auth.js";


export function makeAuthUser(){

    const userRepository = new PrismaUserRepository()
    const authUserUseCase = new AuthUserUseCase(userRepository)

    return authUserUseCase
}