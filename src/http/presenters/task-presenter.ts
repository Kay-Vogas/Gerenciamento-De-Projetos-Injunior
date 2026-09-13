import type { PRIORITY, Task } from "@/@types/prisma/client.js";

type HTTPTask = {
	id: string;
	title: string;
	description: string | null;
	priority: PRIORITY;
	completed: boolean;
	deadline: Date;
	projectId: string;
};

export function toHTTP(task: Task): HTTPTask;
export function toHTTP(tasks: Task[]): HTTPTask[];
export function toHTTP(input: Task | Task[]): HTTPTask | HTTPTask[] {
	if (Array.isArray(input)) {
		return input.map((task) => toHTTP(task));
	}

	return {
		id: input.id,
		title: input.title,
		description: input.description,
		priority: input.priority,
		completed: input.completed,
		deadline: input.deadline,
		projectId: input.projectId,
	};
}
