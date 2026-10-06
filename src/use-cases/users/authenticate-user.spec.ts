import { describe, expect, it, vi } from "vitest";
import type { User } from "@/@types/prisma/client.js";
import type { UserRepository } from "@/repositories/users-repository.js";
import {
	AuthUserUseCase,
	type HashProvider,
	type TokenProvider,
} from "./auth.js";

describe("AuthUserUseCase", () => {
	it("deve retornar um token quando o email e a senha estiverem corretos", async () => {
		// Arrange
		const fakeUser = {
			id: "user-1",
			name: "john_doe",
			email: "john@example.com",
			password: "senha-hasheada-123",
		} as unknown as User;

		const userRepository = {
			findByEmailOrName: vi.fn().mockResolvedValue(fakeUser),
		} as unknown as UserRepository;

		const hashProvider: HashProvider = {
			compare: vi.fn().mockResolvedValue(true),
		};

		const tokenProvider: TokenProvider = {
			generate: vi.fn().mockResolvedValue("token-falso-123"),
		};

		// Injeção de dependências
		const sut = new AuthUserUseCase(
			userRepository,
			hashProvider,
			tokenProvider,
		);

		// Act
		const response = await sut.execute({
			login: "john@example.com",
			password: "123456",
		});

		// Assert
		expect(response.token).toBe("token-falso-123");

		expect(userRepository.findByEmailOrName).toHaveBeenCalledWith(
			"john@example.com",
			"john@example.com",
		);

		expect(hashProvider.compare).toHaveBeenCalledWith(
			"123456",
			"senha-hasheada-123",
		);

		expect(tokenProvider.generate).toHaveBeenCalledWith({ sub: "user-1" });
	});

	it("deve lançar erro quando o usuário não existir", async () => {
		const userRepository = {
			findByEmailOrName: vi.fn().mockResolvedValue(null),
		} as unknown as UserRepository;
		const hashProvider: HashProvider = { compare: vi.fn() };
		const tokenProvider: TokenProvider = { generate: vi.fn() };

		const sut = new AuthUserUseCase(
			userRepository,
			hashProvider,
			tokenProvider,
		);

		await expect(
			sut.execute({ login: "naoexiste@example.com", password: "123456" }),
		).rejects.toThrow("Login ou Senha incorretos");

		expect(hashProvider.compare).not.toHaveBeenCalled();
		expect(tokenProvider.generate).not.toHaveBeenCalled();
	});

	it("deve lançar erro quando a senha estiver incorreta", async () => {
		const fakeUser = {
			id: "user-1",
			password: "senha-hasheada-123",
		} as unknown as User;
		const userRepository = {
			findByEmailOrName: vi.fn().mockResolvedValue(fakeUser),
		} as unknown as UserRepository;
		const hashProvider: HashProvider = {
			compare: vi.fn().mockResolvedValue(false),
		};
		const tokenProvider: TokenProvider = { generate: vi.fn() };

		const sut = new AuthUserUseCase(
			userRepository,
			hashProvider,
			tokenProvider,
		);

		await expect(
			sut.execute({ login: "john@example.com", password: "errada" }),
		).rejects.toThrow("Login ou Senha incorretos");

		expect(tokenProvider.generate).not.toHaveBeenCalled();
	});
});