import "dotenv/config";

import { Env, Host } from "../types";

export const Config = {
	IS_PROD: <boolean>(process.env.NODE_ENV === Env.PROD),
	PORT: <number>parseInt(process.env.PORT || "3000"),
	HOST: <string>(process.env.NODE_ENV === Env.PROD ? Host.PROD : Host.DEV),
	MONGO_URI: <string>process.env.MONGO_URI || "mongodb://localhost:27057/kickups",
	SKIP_DB: <boolean>(process.env.SKIP_DB?.toLowerCase() === "true")
};
