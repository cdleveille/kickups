import { Score } from "../src/server/models";
import { execute } from "./execute";

const clearScores = async () => Score.deleteMany();

execute(clearScores);
