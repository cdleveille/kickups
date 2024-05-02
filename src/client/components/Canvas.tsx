import { useCallback } from "react";

import { Game, start } from "@game";

interface ICanvasProps {
	game: Game;
	setIsOffline: (isOffline: boolean) => void;
}

export const Canvas = ({ game, setIsOffline }: ICanvasProps) => {
	const ref = useCallback((canvas: HTMLCanvasElement) => {
		(async () => {
			await start(canvas, game, setIsOffline);
		})();
	}, []);

	return <canvas ref={ref} />;
};
