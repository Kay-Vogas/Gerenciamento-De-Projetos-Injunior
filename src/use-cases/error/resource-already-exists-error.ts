export class ResourceAlreadyExistsError extends Error {
	constructor() {
		super("O recurso já existe.");
	}
}
