export interface TokenProvider {
  generateResetToken(userId: string): string;
  verifyResetToken(token: string): { sub: string };
}