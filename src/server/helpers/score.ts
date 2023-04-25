import { Socket } from "socket.io";

import { Config } from "@helpers";
import { Score } from "@models";
import { IScore, TOP_SCORES_LIMIT } from "@shared";

export const newScore = async (score: IScore, socket: Socket) => {
	if (Config.SKIP_DB) return;
	if (!score.user || !score.score) return;
	const lowestTopScore = await getLowestTopScore();
	if (lowestTopScore && score.score < lowestTopScore) return;
	await Score.create(score);
	await sendTopScoresToClient(socket, true);
};

export const sendTopScoresToClient = async (socket: Socket, broadcast?: boolean) => {
	if (Config.SKIP_DB) return;
	const topScores = await getTopScores(TOP_SCORES_LIMIT);
	socket.emit("server-send-top-scores", topScores);
	if (broadcast) socket.broadcast.emit("server-send-top-scores", topScores);
};

const getTopScores = async (limit: number) => {
	return Score.find<IScore>({}, { user: 1, score: 1, _id: 0 }).sort({ score: -1 }).limit(limit);
};

const getLowestTopScore = async () => {
	const topScores = await getTopScores(TOP_SCORES_LIMIT);
	return topScores.length === TOP_SCORES_LIMIT ? topScores[topScores.length - 1].score : null;
};
