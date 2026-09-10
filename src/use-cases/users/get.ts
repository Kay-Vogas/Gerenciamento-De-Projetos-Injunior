import type { User } from "@/@types/prisma/browser.js";
import type { UserRepository } from "@/repositories/users-repository.js";

interface GetUserUseCaseRequest {
	id: string;
}

type GetUserUseCaseResponse = {
	user: User;
};

export class GetUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({
		id,
	}: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
		const user = await this.userRepository.findBy({ id });

		if (!user) {
			throw new Error("Usuário não encontrado no sistema");
		}

		return { user };
	}
}
