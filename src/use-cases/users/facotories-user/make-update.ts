import { PrismaUserRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { UpdateUserUseCase } from "../update.js";

export function makeUpdateUser() {
	const userRepository = new PrismaUserRepository();
	const updateUserUseCase = new UpdateUserUseCase(userRepository);

	return updateUserUseCase;
}
