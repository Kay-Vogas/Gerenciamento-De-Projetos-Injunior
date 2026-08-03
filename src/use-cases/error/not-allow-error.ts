export class NotAllowedError extends Error {
  constructor() {
    super('Não autorizado. Você não tem permissão para esta ação.')
  }
}