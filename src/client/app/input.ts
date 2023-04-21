import { Game } from "@app";

export class InputHandler {
	constructor(canvas: HTMLCanvasElement, game: Game) {
		canvas.oncontextmenu = e => {
			e.preventDefault();
		};

		canvas.addEventListener("mousedown", e => {
			if (e.button !== 0) return;
			game.onKick(this.getMousePos(e, game));
		});

		canvas.addEventListener("mousemove", e => {
			game.updateMousePos(this.getMousePos(e, game));
		});
	}

	getMousePos(e: MouseEvent, game: Game) {
		return { x: e.clientX - game.xOffset, y: e.clientY - game.yOffset };
	}
}
