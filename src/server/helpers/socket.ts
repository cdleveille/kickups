import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

export const initSocket = (httpServer: HttpServer) => {
	const io = new Server(httpServer);

	io.on("connect", (socket: Socket) => {
		console.log("socket.io: client connected");

		socket.on("ping", () => {
			console.log("socket.io: ping from client");
			socket.emit("ping");
		});
	});
};
