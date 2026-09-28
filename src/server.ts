import { app } from "./app.js";
import { env } from "./env/index.js";
import { notifyTasksDueSoon } from "./jobs/notification.js";

app
	.listen({
		host: env.HOST,
		port: env.PORT,
	})
	.then(() => {
		const url = `htpp://localhost:${env.PORT}`;
		console.log(`Htpp server Running at ${url}`);
		notifyTasksDueSoon();
	});
