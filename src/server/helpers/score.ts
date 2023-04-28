import CryptoJS from "crypto-js";
import { Socket } from "socket.io";

import { Config } from "@helpers";
import { Score } from "@models";
import { IEncryptedScore, IScore, TOP_SCORES_LIMIT } from "@shared";

export const newScore = async (encryptedScore: IEncryptedScore, socket: Socket) => {
	if (Config.SKIP_DB) return;
	if (!encryptedScore.user || !encryptedScore.score) return;
	const decryptedScore = parseInt(CryptoJS.AES.decrypt(encryptedScore.score, socket.id).toString(CryptoJS.enc.Utf8));
	if (isNaN(decryptedScore) || !Number.isInteger(decryptedScore) || decryptedScore < 1) return;
	const lowestTopScore = await getLowestTopScore();
	if (lowestTopScore && decryptedScore < lowestTopScore) return;
	await Score.create({ user: encryptedScore.user, score: decryptedScore } as IScore);
	await sendTopScoresToClient(socket, true);
};

export const sendTopScoresToClient = async (socket: Socket, broadcast?: boolean) => {
	if (Config.SKIP_DB) return;
	const topScores = await getTopScores(TOP_SCORES_LIMIT);
	socket.emit("server-send-top-scores", topScores);
	if (broadcast) socket.broadcast.emit("server-send-top-scores", topScores);
};

export const getTopScores = async (limit: number) =>
	Score.find<IScore>({}, { user: 1, score: 1, _id: 0 }).sort({ score: -1 }).limit(limit);

const getLowestTopScore = async () => {
	const topScores = await getTopScores(TOP_SCORES_LIMIT);
	return topScores.length === TOP_SCORES_LIMIT ? topScores[topScores.length - 1].score : null;
};
