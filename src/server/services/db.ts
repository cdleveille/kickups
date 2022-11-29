import mongoose from "mongoose";

import { Config } from "../helpers/config";

export const connectToDatabase = async () => {
	try {
		await mongoose.connect(Config.MONGO_URI);
		console.log(`Connected to database: ${Config.MONGO_URI}`);
	} catch (error) {
		console.log(`Error connecting to database: ${error}`);
	}
};
