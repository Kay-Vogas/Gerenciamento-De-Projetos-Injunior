import type { UserRepository } from "@/repositories/users-repository.js";

interface DeleteUserUseCaseResquest {
	id: string;
}

export class DeleteUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute({ id }: DeleteUserUseCaseResquest) {
		const findUser = await this.userRepository.findBy({ id });

		if (!findUser) {
			throw new Error("Este Usuário não foi encontrado no sistema.");
		}

		await this.userRepository.delete(id);
	}
}
