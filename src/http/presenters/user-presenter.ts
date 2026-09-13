import type { User } from "@/@types/prisma/client.js";

type HTTPUser = {
	id: string;
	name: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
};

export function toHTTP(user: User): HTTPUser;
export function toHTTP(users: User[]): HTTPUser[];
export function toHTTP(input: User | User[]): HTTPUser | HTTPUser[] {
	if (Array.isArray(input)) {
		// Agora chamamos a função diretamente, sem a classe
		return input.map((user) => toHTTP(user));
	}

	return {
		id: input.id,
		name: input.name,
		email: input.email,
		createdAt: input.createdAt,
		updatedAt: input.updatedAt,
	};
}
