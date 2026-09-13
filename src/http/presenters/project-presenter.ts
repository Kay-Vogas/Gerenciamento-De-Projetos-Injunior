import type { Project, STATUS } from "@/@types/prisma/client.js";

type HTTPProject = {
	id: string;
	name: string;
	description: string | null;
	status: STATUS;
	createdAt: Date;
	updatedAt: Date;
};

export function toHTTP(project: Project): HTTPProject;
export function toHTTP(projects: Project[]): HTTPProject[];
export function toHTTP(
	input: Project | Project[],
): HTTPProject | HTTPProject[] {
	if (Array.isArray(input)) {
		return input.map((project) => toHTTP(project));
	}

	return {
		id: input.id,
		name: input.name,
		description: input.description,
		status: input.status,
		createdAt: input.createdAt,
		updatedAt: input.updatedAt,
	};
}
