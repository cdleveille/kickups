/// <reference lib="dom" />

import "./style.css";

import { createRoot } from "react-dom/client";

import { App } from "@components";
import { useConfig, useSocket } from "@hooks";

const registerServiceWorker = async () => {
	if (!navigator.serviceWorker) return;
	if (!navigator.serviceWorker.controller) await navigator.serviceWorker.register("sw.js");
};

window.addEventListener("load", async () => {
	const {
		Config: { IS_PROD }
	} = useConfig();
	const { socket } = useSocket();
	socket.on("hello", () => console.log("socket.io: hello from server!"));
	socket.emit("hello");
	if (IS_PROD) await registerServiceWorker();
});

const rootDiv = document.createElement("div");
document.body.appendChild(rootDiv);
const root = createRoot(rootDiv);
root.render(<App />);
