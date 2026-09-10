import bcrypt, { compare, hash } from "bcryptjs";
import type { User } from "@/@types/prisma/client.js";
import { env } from "@/env/index.js";
import type { UserRepository } from "@/repositories/users-repository.js";

interface AuthUserUseCaseRequest {
	login: string;
	password: string;
}

type AuthUserUseCaseResponse = {
	user: User;
};

export class AuthUserUseCase {
	constructor(private userReposiry: UserRepository) {}

	async execute({
		login,
		password,
	}: AuthUserUseCaseRequest): Promise<AuthUserUseCaseResponse> {
		const user = await this.userReposiry.findByEmailOrName(login, login);

		if (!user) {
			throw new Error("Login ou Senha incorretos,");
		}

		const passwordHashingCompare = await bcrypt.compare(
			password,
			user.password,
		);

		if (!passwordHashingCompare) {
			throw new Error("Login ou Senha incorretos,");
		}

		return { user };
	}
}
