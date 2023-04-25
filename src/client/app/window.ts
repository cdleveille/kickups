import { IResize } from "@types";

import { Game } from "./game";

export class WindowHandler {
	canvas: HTMLCanvasElement;
	game: Game;

	constructor(canvas: HTMLCanvasElement, game: Game) {
		this.canvas = canvas;
		this.game = game;

		screen.orientation.lock("portrait");

		window.addEventListener("resize", () => {
			this.resize();
		});

		window.addEventListener("orientationchange", () => {
			this.resize();
		});

		window.addEventListener("online", () => {
			// game.goOnline();
		});

		window.addEventListener("offline", () => {
			// game.goOffline();
		});

		this.resize();
	}

	resize() {
		this.canvas.width = Math.max(screen.width, window.innerWidth);
		this.canvas.height = Math.max(screen.height, window.innerHeight);
		const newScreen = this.getNewGameScreen();
		this.game.resize(newScreen);
	}

	// use max available 3:4 area in window
	getNewGameScreen() {
		const widthRatio = 3;
		const heightRatio = 4;
		const heightUsingMaxWidth = Math.floor(window.innerWidth * (heightRatio / widthRatio));
		if (heightUsingMaxWidth <= window.innerHeight)
			return {
				width: window.innerWidth,
				height: heightUsingMaxWidth,
				xOffset: 0,
				yOffset: (window.innerHeight - heightUsingMaxWidth) / 2
			} as IResize;
		const widthUsingMaxHeight = Math.floor(window.innerHeight * (widthRatio / heightRatio));
		return {
			width: widthUsingMaxHeight,
			height: window.innerHeight,
			xOffset: (window.innerWidth - widthUsingMaxHeight) / 2,
			yOffset: 0
		} as IResize;
	}
}
