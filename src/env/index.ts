import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "staging", "production"])
		.default("development"),
	HOST: z.string().default("0.0.0.0"),
	PORT: z.coerce.number().int().min(1024).max(65535).default(3333),

	DATABASE_URL: z.string(),
	HASH_SALT_ROUNDS: z.coerce.number().default(12),

	JWT_SECRET: z.string().min(1),
	EMAIL: z.string().min(1),
	PASSWORD: z.string().min(1)
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
	console.log("Invalid enviroment variables", _env.error);

	throw new Error("Invalid enviroment variables");
}

export const env = _env.data;
