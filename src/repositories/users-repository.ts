import type { User } from "@/@types/prisma/browser.js";
import type { Prisma } from "@/@types/prisma/client.js";

export interface UserRepository {
	create(data: Prisma.UserCreateInput): Promise<User>;
	list(): Promise<User[]>;
	update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
	delete(id: string): Promise<void>;
	findBy(where: Prisma.UserWhereInput): Promise<User | null>;
	findByEmailOrName(email: string, name: string): Promise<User | null>;
}
