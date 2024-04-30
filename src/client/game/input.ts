import { Game } from "@game";

export class InputHandler {
	constructor(canvas: HTMLCanvasElement, game: Game) {
		document.onscroll = e => {
			e.preventDefault();
		};

		canvas.oncontextmenu = e => {
			e.preventDefault();
		};

		canvas.addEventListener("touchstart", e => {
			e.preventDefault();
			const touch = e.touches.item(0);
			if (!touch) return;
			game.onKick(InputHandler.getMouseOrTouchPos(touch, game));
		});

		canvas.addEventListener("mousedown", e => {
			if (e.button !== 0) return;
			game.onKick(InputHandler.getMouseOrTouchPos(e, game));
		});

		canvas.addEventListener("mousemove", e => {
			game.updateMousePos(InputHandler.getMouseOrTouchPos(e, game));
		});
	}

	static getMouseOrTouchPos(e: MouseEvent | Touch, game: Game) {
		return { x: e.clientX - game.xOffset, y: e.clientY - game.yOffset };
	}
}
