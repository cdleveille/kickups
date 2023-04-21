import { Game } from "@app";

export class InputHandler {
	constructor(canvas: HTMLCanvasElement, game: Game) {
		canvas.oncontextmenu = e => {
			e.preventDefault();
		};

		canvas.addEventListener("mousedown", e => {
			if (e.button !== 0) return;
			const { x, y } = this.getMousePos(e, game);
			game.onKick(x, y);
		});
	}

	getMousePos(e: MouseEvent, game: Game) {
		return { x: e.clientX - game.xOffset, y: e.clientY - game.yOffset };
	}
}
