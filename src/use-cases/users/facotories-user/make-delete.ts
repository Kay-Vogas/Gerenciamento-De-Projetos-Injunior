import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { DeleteUserUseCase } from "../delete.js";


export function makeDeleteUser(){

    const userRepository = new PrismaUserRepository()
    const deleteUserUseCase = new DeleteUserUseCase(userRepository)

    return deleteUserUseCase
}