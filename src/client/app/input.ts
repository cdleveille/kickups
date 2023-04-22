import { Game } from "@app";

export class InputHandler {
	constructor(canvas: HTMLCanvasElement, game: Game) {
		canvas.oncontextmenu = e => {
			e.preventDefault();
		};

		canvas.addEventListener("touchstart", e => {
			e.preventDefault();
			if (e.touches.length > 1) return;
			const touch = e.touches.item(0);
			game.onKick(this.getTouchPos(touch, game));
		});

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

	getTouchPos(touch: Touch, game: Game) {
		return { x: touch.clientX - game.xOffset, y: touch.clientY - game.yOffset };
	}
}
