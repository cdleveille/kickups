import React, { useCallback, useEffect, useState } from "react";
import useKeypress from "react-use-keypress";

import { Game, socket } from "@app";
import { Canvas, Initials, Score, Top } from "@components";
import { useLocalStorage } from "@hooks";
import { SocketEvent } from "@shared";
import { INITIALS_LOCAL_STORAGE_KEY, Key } from "@types";

export const App = () => {
	const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();
	const [score, setScore] = useState(0);
	const [scaleRatio, setScaleRatio] = useState<number>();
	const [offset, setOffset] = useState({ xOffset: 0, yOffset: 0 });
	const [initials, setInitials] = useState(getLocalStorageItem<string>(INITIALS_LOCAL_STORAGE_KEY));
	const [showInitialsInput, setShowInitialsInput] = useState(false);
	const [showTopList, setShowTopList] = useState(false);
	const [isOffline, setIsOffline] = useState(!navigator.onLine);

	const endStreak = (score: number) => {
		setScore(0);
		if (isOffline) return;
		const initials = getLocalStorageItem<string>(INITIALS_LOCAL_STORAGE_KEY);
		if (initials && score > 0) {
			socket.emit(SocketEvent.CLIENT_SEND_NEW_SCORE, { user: initials, score });
		}
	};

	const clearScreen = () => {
		setShowInitialsInput(false);
		setShowTopList(false);
	};

	const newGame = useCallback(() => new Game(setScore, setScaleRatio, setOffset, endStreak, clearScreen), []);
	const [game] = useState<Game>(newGame);

	useEffect(() => {
		if (!initials) return;
		setLocalStorageItem(INITIALS_LOCAL_STORAGE_KEY, initials);
	}, [initials]);

	useKeypress(Key.ESCAPE, e => {
		e.preventDefault();
		clearScreen();
	});

	useKeypress(Key.ONE, e => {
		e.preventDefault();
		clearScreen();
		setShowInitialsInput(!showInitialsInput);
	});

	useKeypress(Key.TWO, e => {
		e.preventDefault();
		clearScreen();
		setShowTopList(!showTopList);
	});

	return (
		<>
			<Canvas game={game} setIsOffline={setIsOffline} />
			<Initials
				initials={initials}
				setInitials={setInitials}
				showInitialsInput={showInitialsInput}
				setShowInitialsInput={setShowInitialsInput}
				clearScreen={clearScreen}
				scaleRatio={scaleRatio}
				offset={offset}
			/>
			<Score score={score} scaleRatio={scaleRatio} offset={offset} />
			<Top
				scaleRatio={scaleRatio}
				offset={offset}
				showTopList={showTopList}
				setShowTopList={setShowTopList}
				clearScreen={clearScreen}
				isOffline={isOffline}
			/>
		</>
	);
};
