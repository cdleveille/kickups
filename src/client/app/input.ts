import { Game } from "@app";

export class InputHandler {
	constructor(canvas: HTMLCanvasElement, game: Game) {
		document.onscroll = e => {
			e.preventDefault();
		};

		document.ontouchmove = e => {
			e.preventDefault();
		};

		canvas.oncontextmenu = e => {
			e.preventDefault();
		};

		canvas.addEventListener("touchstart", e => {
			e.preventDefault();
			if (e.touches.length > 1) return;
			game.onKick(InputHandler.getMouseOrTouchPos(e.touches.item(0), game));
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
