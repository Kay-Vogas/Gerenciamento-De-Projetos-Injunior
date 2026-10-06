
import type { User } from "@/@types/prisma/client.js";
import type { UserRepository } from "@/repositories/users-repository.js";
 
export interface HashProvider {
	compare(plain: string, hashed: string): Promise<boolean>;
}
 
export interface TokenProvider {
	generate(payload: { sub: string }): Promise<string> | string;
}
 
interface AuthenticateUserUseCaseRequest {
	login: string;
	password: string;
}
 
type AuthenticateUserUseCaseResponse = {
	token: string;
	user: User;
};
 
export class AuthUserUseCase {
	constructor(
		private userRepository: UserRepository,
		private hashProvider: HashProvider,
		private tokenProvider: TokenProvider,
	) {}
 
	async execute({
		login,
		password,
	}: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
		const user = await this.userRepository.findByEmailOrName(login, login);
 
		if (!user) {
			throw new Error("Login ou Senha incorretos");
		}
 
		const passwordMatches = await this.hashProvider.compare(
			password,
			user.password,
		);
 
		if (!passwordMatches) {
			throw new Error("Login ou Senha incorretos");
		}
 
		const token = await this.tokenProvider.generate({ sub: user.id });
 
		return { token, user };
	}
}