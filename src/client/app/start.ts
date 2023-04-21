import "../css/style.css";

import { Game, InputHandler, now, WindowHandler } from "@app";

declare const navigator: Navigator;

export const start = async (canvas: HTMLCanvasElement, game: Game) => {
	const ctx = canvas.getContext("2d");
	new InputHandler(canvas, game);
	new WindowHandler(canvas, game);
	game.init();

	window.addEventListener("load", async () => {
		if (!navigator.serviceWorker) return;
		if (!navigator.serviceWorker.controller) {
			await navigator.serviceWorker.register("sw.js");
			console.log("new service worker registered");
		} else console.log("active service worker found");
	});

	let current: number,
		delta: number,
		last: number = now();

	const frame = () => {
		current = now();
		delta = (current - last) / 1000;
		requestAnimationFrame(frame);
		game.update(delta);
		game.draw(ctx);
		last = current;
	};

	requestAnimationFrame(frame);
};
