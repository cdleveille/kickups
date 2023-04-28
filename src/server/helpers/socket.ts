import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

import { newScore, sendTopScoresToClient } from "@helpers";
import { IEncryptedScore, SocketEvent } from "@shared";

export const initSocket = (httpServer: HttpServer) => {
	const io = new Server(httpServer);
	io.on("connect", (socket: Socket) => {
		socket.on(SocketEvent.CLIENT_REQUEST_TOP_SCORES, async () => {
			await sendTopScoresToClient(socket);
		});

		socket.on(SocketEvent.CLIENT_SEND_NEW_SCORE, async (score: IEncryptedScore) => {
			await newScore(score, socket);
		});
	});
};
