import "../css/style.css";

import { Game, InputHandler, now, WindowHandler } from "@app";

export const start = async (canvas: HTMLCanvasElement, game: Game, setIsOffline: (isOffline: boolean) => void) => {
	const ctx = canvas.getContext("2d");
	new InputHandler(canvas, game);
	new WindowHandler(canvas, game, setIsOffline);
	game.init();

	let current: number,
		last: number = now(),
		delta: number,
		lastDelta: number;

	const frame = () => {
		current = now();
		delta = (current - last) / 1000;
		if (delta > lastDelta * 10) delta = lastDelta;
		requestAnimationFrame(frame);
		game.update(delta);
		game.draw(ctx);
		last = current;
		lastDelta = delta;
	};

	requestAnimationFrame(frame);
};
