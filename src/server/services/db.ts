import mongoose from "mongoose";

import { Config } from "@helpers";

export const connectToDatabase = async () => {
	try {
		console.log(`Connecting to database on ${Config.MONGO_URI}...`);
		await mongoose.connect(Config.MONGO_URI);
		console.log("Connected to database.");
	} catch (error) {
		console.log(`Error connecting to database: ${error}`);
	}
};
