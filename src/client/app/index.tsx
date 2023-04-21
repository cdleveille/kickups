import "../css/style.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";

import { Index } from "@pages";

window.addEventListener("load", async () => {
	// @ts-ignore
	if (!navigator.serviceWorker) return;
	// @ts-ignore
	if (!navigator.serviceWorker.controller) {
		// @ts-ignore
		await navigator.serviceWorker.register("sw.js");
		console.log("new service worker registered");
	} else console.log("active service worker found");
});

const socket = io();
socket.on("ping", () => {
	console.log("socket.io: ping from server");
});
socket.emit("ping");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Index />
	</React.StrictMode>
);
