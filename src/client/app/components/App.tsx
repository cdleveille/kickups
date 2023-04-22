import React, { useState } from "react";

import { Game } from "@app";
import { Canvas, Score } from "@components";

export const App = () => {
	const [score, setScore] = useState<number>(0);
	const [scoreBottom, setScoreBottom] = useState<number>();
	const [scoreFontSize, setScoreFontSize] = useState<number>();
	const [game] = useState<Game>(new Game(setScore, setScoreBottom, setScoreFontSize));

	return (
		<>
			<Canvas game={game} />
			<Score score={score} bottom={scoreBottom} fontSize={scoreFontSize} />
		</>
	);
};
