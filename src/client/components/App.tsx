import CryptoJS from "crypto-js";
import { useCallback, useEffect, useState } from "react";
import useKeypress from "react-use-keypress";

import { Canvas, Initials, Score, Top } from "@components";
import { Game } from "@game";
import { useLocalStorage, useSocket } from "@hooks";
import { IEncryptedScore, INITIALS_LOCAL_STORAGE_KEY, Key, SocketEvent } from "@types";

export const App = () => {
	const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();
	const [score, setScore] = useState(0);
	const [streakEndScore, setStreakEndScore] = useState({ value: 0, switch: false });
	const [scaleRatio, setScaleRatio] = useState<number>();
	const [offset, setOffset] = useState({ xOffset: 0, yOffset: 0 });
	const [initials, setInitials] = useState(getLocalStorageItem<string>(INITIALS_LOCAL_STORAGE_KEY));
	const [showInitialsInput, setShowInitialsInput] = useState(false);
	const [showTopList, setShowTopList] = useState(false);
	const [isOffline, setIsOffline] = useState(!navigator.onLine);

	const { socket } = useSocket();

	const endStreak = (gameScore: number) => {
		setScore(0);
		if (gameScore <= 0) return;
		setStreakEndScore({ value: gameScore, switch: !streakEndScore.switch });
		if (isOffline) return;
		const initials = getLocalStorageItem<string>(INITIALS_LOCAL_STORAGE_KEY);
		if (!initials) return;
		const encryptedScore = CryptoJS.AES.encrypt(gameScore.toString(), socket.id as string).toString();
		socket.emit(SocketEvent.CLIENT_SEND_NEW_SCORE, { user: initials, score: encryptedScore } as IEncryptedScore);
	};

	const clearScreen = () => {
		setShowInitialsInput(false);
		setShowTopList(false);
	};

	const newGame = useCallback(() => new Game(setScore, setScaleRatio, setOffset, endStreak, clearScreen), []);
	const [game] = useState(newGame);

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
			<Score score={score} streakEndScore={streakEndScore} scaleRatio={scaleRatio} offset={offset} />
			<Top
				showTopList={showTopList}
				setShowTopList={setShowTopList}
				clearScreen={clearScreen}
				isOffline={isOffline}
				scaleRatio={scaleRatio}
				offset={offset}
			/>
		</>
	);
};
