import { connectToDatabase } from "../src/server/services/db";

export const execute = async (procedure: () => Promise<any>, skipDb?: boolean) => {
	try {
		if (!skipDb) await connectToDatabase();
		await procedure();
		process.exit(0);
	} catch (error) {
		console.error({ error });
		process.exit(1);
	}
};
