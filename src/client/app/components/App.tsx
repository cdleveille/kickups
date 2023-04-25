import React, { useEffect, useState } from "react";

import { Game } from "@app";
import { Canvas, Initials, Score } from "@components";
import { useLocalStorage } from "@hooks";
import { INITIALS_LOCAL_STORAGE_KEY } from "@types";

export const App = () => {
	const { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } = useLocalStorage();
	const [score, setScore] = useState(0);
	const [scaleRatio, setScaleRatio] = useState<number>();
	const [offset, setOffset] = useState({ xOffset: 0, yOffset: 0 });
	const [initials, setInitials] = useState(getLocalStorageItem<string>(INITIALS_LOCAL_STORAGE_KEY) ?? "???");
	const [game] = useState<Game>(new Game(setScore, setScaleRatio, setOffset));

	useEffect(() => {
		if (!initials || initials === "???") {
			removeLocalStorageItem(INITIALS_LOCAL_STORAGE_KEY);
		} else {
			setLocalStorageItem(INITIALS_LOCAL_STORAGE_KEY, initials);
		}
	}, [initials]);

	return (
		<>
			<Canvas game={game} />
			<Initials initials={initials} setInitials={setInitials} scaleRatio={scaleRatio} offset={offset} />
			<Score score={score} scaleRatio={scaleRatio} offset={offset} />
		</>
	);
};
