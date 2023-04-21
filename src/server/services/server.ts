import compression from "compression";
import cors from "cors";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import { createServer } from "http";
import morgan from "morgan";
import path from "path";

import { router } from "@controllers";
import { Config, initSocket } from "@helpers";
import { connectToDatabase, log } from "@services";
import { Env, Routes } from "@types";

export const startServer = async () => {
	const app = express();
	await connectToDatabase();

	const logStream = fs.createWriteStream("requests.log", { flags: "a" });
	app.use(morgan("combined", { stream: logStream }));
	app.use(
		helmet.contentSecurityPolicy({
			directives: {
				"default-src": ["'self'"],
				"object-src": ["'none'"],
				"script-src": ["'self'", "'unsafe-eval'"],
				"style-src": ["'self'", "'unsafe-inline'"],
				"img-src": ["'self' blob: data:"],
				"connect-src": ["'self'", "www.googletagmanager.com"]
			}
		})
	);
	app.use(compression());
	app.use(
		cors({
			origin: "*",
			methods: ["GET", "POST", "PUT", "DELETE"]
		})
	);
	app.use(Routes.root, router);
	app.use(express.static(path.join(process.cwd(), "build/client")));
	app.set("json spaces", 2);
	app.disable("x-powered-by");

	const httpServer = createServer(app);
	initSocket(httpServer);
	httpServer.listen(Config.PORT, () => {
		log.info(
			`Server started in ${Config.IS_PROD ? Env.prod : Env.dev} mode${
				Config.IS_PROD ? "." : ` - listening on http://${Config.HOST}:${Config.PORT}`
			}`
		);
	});
};
