import type { FastifyInstance } from "fastify";
import type { TokenProvider } from "./token-provider.js";

type JwtUtils = FastifyInstance["jwt"];

export class FastifyJwtTokenProvider implements TokenProvider {
  constructor(private app: FastifyInstance) {}

  private get resetJwt(): JwtUtils {
    const reset = (this.app.jwt as unknown as Record<string, JwtUtils | undefined>).reset;

    if (!reset) {
      throw new Error(
        'Namespace "reset" do @fastify/jwt não registrado. Verifique o register com namespace: "reset".',
      );
    }

    return reset;
  }

  generateResetToken(userId: string): string {
    return this.resetJwt.sign({
        sub: userId,
        role: "USER"
    });
  }

  verifyResetToken(token: string): { sub: string } {
    return this.resetJwt.verify<{ sub: string }>(token);
  }
}