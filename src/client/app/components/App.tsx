import React, { useState } from "react";

import { Game } from "@app";
import { Canvas, Initials, Score } from "@components";
import { useLocalStorage } from "@hooks";
import { INTIALS_LOCAL_STORAGE_KEY } from "@types";

export const App = () => {
	const { getLocalStorageItem } = useLocalStorage();
	const [score, setScore] = useState(0);
	const [scoreBottom, setScoreBottom] = useState<number>();
	const [scoreFontSize, setScoreFontSize] = useState<number>();
	const [initials, setInitials] = useState(getLocalStorageItem(INTIALS_LOCAL_STORAGE_KEY) ?? "");
	const [game] = useState<Game>(new Game(setScore, setScoreBottom, setScoreFontSize));

	return (
		<>
			<Canvas game={game} />
			<Initials initials={initials} setInitials={setInitials} scaleRatio={1} />
			<Score score={score} bottom={scoreBottom} fontSize={scoreFontSize} />
		</>
	);
};
