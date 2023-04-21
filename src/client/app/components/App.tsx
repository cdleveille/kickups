import React, { useState } from "react";

import { Game } from "@app";
import { Canvas, Score } from "@components";

export const App = () => {
	const [score, setScore] = useState<number>(0);
	const [game] = useState<Game>(new Game(setScore));

	return (
		<>
			<Canvas game={game} />
			<Score score={score} />
		</>
	);
};
