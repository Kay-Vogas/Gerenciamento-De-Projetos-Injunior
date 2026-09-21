// src/use-cases/rec-senha.ts
import type { TokenProvider } from "@/http/middlewares/token-provider.js";
import type { SendEmail } from "@/infra/Email.interface.js";
import type { UserRepository } from "@/repositories/users-repository.js";

interface RecSenha {
  email: string;
}

export class RecSenhaUseCase {
  constructor(
    private userRepository: UserRepository,private tokenProvider: TokenProvider,private sendEmail: SendEmail) {}

  async execute({ email }: RecSenha): Promise<void> {
    const user = await this.userRepository.findBy({ email });

    if (!user) return;

    const token = this.tokenProvider.generateResetToken(user.id);
    const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await this.sendEmail.send({
      to: user.email,
      subject: "Recuperação de senha",
      html: `
        <p>Olá, ${user.name}!</p>
        <p>Clique no link abaixo para redefinir sua senha (válido por 15 minutos):</p>
        <a href="${link}">Redefinir senha</a>
        <p>Se não foi você, ignore este e-mail.</p>
      `,
    });
  }
}