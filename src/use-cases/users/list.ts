import type { User } from "@/@types/prisma/client.js";
import type { UserRepository } from "@/repositories/users-repository.js";

type ListUserUseCaseResponse = {
	users: User[];
};

export class ListUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(): Promise<ListUserUseCaseResponse> {
		const users = await this.userRepository.list();

		return { users };
	}
}
