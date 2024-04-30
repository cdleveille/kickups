import { Game } from "@game";

import { InputHandler } from "./input";
import { now } from "./util";
import { WindowHandler } from "./window";

export const start = async (canvas: HTMLCanvasElement, game: Game, setIsOffline: (isOffline: boolean) => void) => {
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not get canvas context");
	new InputHandler(canvas, game);
	new WindowHandler(canvas, game, setIsOffline);
	game.init();

	let current: number,
		last: number = now(),
		delta: number;

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
