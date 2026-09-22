import type { SendEmail } from "@/infra/Email.interface.js";
import type {
  OverdueTask,
  TasksRepository,
} from "@/repositories/tasks-repository.js";

interface SendOverdueTasksDigestRequest {
  now?: Date;  
}

interface SendOverdueTasksDigestResponse {
  usersNotified: number;
  tasksCount: number;
  failed: number;
}

interface UserGroup {
  assignee: OverdueTask["assignee"];
  tasks: OverdueTask[];
}

export class SendOverdueTasksDigestUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private sendEmail: SendEmail,
  ) {}

  async execute({
    now = new Date(),
  }: SendOverdueTasksDigestRequest = {}): Promise<SendOverdueTasksDigestResponse> {
    const overdueTasks = await this.tasksRepository.findOverdue(now);

    if (overdueTasks.length === 0) {
      return { usersNotified: 0, tasksCount: 0, failed: 0 };
    }

    const groups = this.groupByAssignee(overdueTasks);

    let usersNotified = 0;
    let failed = 0;

    for (const { assignee, tasks } of groups.values()) {
      try {
        const { subject, html } = buildOverdueTasksEmail({
          userName: assignee.name,
          tasks,
          referenceDate: now,
        });

        await this.sendEmail.send({ to: assignee.email, subject, html });
        usersNotified++;
      } catch {
        failed++; // um envio falhar não interrompe os demais usuários
      }
    }

    return { usersNotified, tasksCount: overdueTasks.length, failed };
  }

  private groupByAssignee(tasks: OverdueTask[]): Map<string, UserGroup> {
    const map = new Map<string, UserGroup>();

    for (const task of tasks) {
      const existing = map.get(task.assignee.id);

      if (existing) {
        existing.tasks.push(task);
      } else {
        map.set(task.assignee.id, { assignee: task.assignee, tasks: [task] });
      }
    }

    return map;
  }
}
