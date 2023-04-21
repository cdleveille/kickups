import React, { useCallback } from "react";

import { Game, start } from "@app";

interface ICanvasProps {
	game: Game;
}

export const Canvas = ({ game }: ICanvasProps) => {
	const ref = useCallback((canvas: HTMLCanvasElement) => {
		(async () => {
			await start(canvas, game);
		})();
	}, []);

	return <canvas id="game-canvas" ref={ref} />;
};
