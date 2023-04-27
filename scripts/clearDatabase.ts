import { Score } from "../src/server/models";
import { execute } from "./execute";

const clearDatabase = async () => Score.deleteMany();

execute(clearDatabase);
