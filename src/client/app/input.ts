import { Game } from "@app";

export class InputHandler {
	constructor(canvas: HTMLCanvasElement, game: Game) {
		canvas.oncontextmenu = e => {
			e.preventDefault();
		};

		canvas.addEventListener("mousedown", e => {
			e.preventDefault();
			const x = e.clientX - game.xOffset;
			const y = e.clientY - game.yOffset;
			game.onClick(x, y);
		});
	}
}
