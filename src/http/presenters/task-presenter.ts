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

function toHTTP(task: Task): HTTPTask;
function toHTTP(tasks: Task[]): HTTPTask[];
function toHTTP(input: Task | Task[]): HTTPTask | HTTPTask[] {
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

export const TaskPresenter = { toHTTP };
