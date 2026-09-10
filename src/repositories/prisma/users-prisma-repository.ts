import type { User } from "@/@types/prisma/browser.js";
import type { Prisma } from "@/@types/prisma/client.js";
import { prisma } from "@/libs/prisma.js";
import type { UserRepository } from "../users-repository.js";

export class PrismaUserRepository implements UserRepository {
	async create(data: Prisma.UserCreateInput) {
		return await prisma.user.create({ data });
	}

	async list() {
		return await prisma.user.findMany();
	}

	async update(id: string, data: Prisma.UserUpdateInput) {
		return await prisma.user.update({
			where: { id },
			data,
		});
	}

	async delete(id: string) {
		await prisma.user.delete({
			where: { id },
		});
	}
	async findBy(where: Prisma.UserWhereInput): Promise<User | null> {
		return prisma.user.findFirst({
			where,
		});
	}
	async findByEmailOrName(email: string, name: string): Promise<User | null> {
		return await prisma.user.findFirst({
			where: {
				OR: [{ email }, { name }],
			},
		});
	}
}
