import { app } from "./app.js";
import { env } from "./env/index.js";

const tasks = startJobs(
  [new OverdueTasksJob(overdueSchedule, app.log)],
  app.log,
  timezone,
);

app.addHook("onClose", async () => {
  for (const task of tasks) task.stop();
});

app
	.listen({
		host: env.HOST,
		port: env.PORT,
	})
	.then(() => {
		const url = `htpp://localhost:${env.PORT}`;
		console.log(`Htpp server Running at ${url}`);
	});

