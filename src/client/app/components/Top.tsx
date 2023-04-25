import React, { CSSProperties, useEffect, useState } from "react";

import { socket } from "@app";
import { useLocalStorage } from "@hooks";
import { IScore, SocketEvent } from "@shared";
import { SCORES_LOCAL_STORAGE_KEY } from "@types";

interface ITopProps {
	scaleRatio: number;
	offset: { xOffset: number; yOffset: number };
	showTopList: boolean;
	setShowTopList: (showTopList: boolean) => void;
	clearScreen: () => void;
	isOffline: boolean;
}

export const Top = ({ scaleRatio, offset, showTopList, setShowTopList, clearScreen, isOffline }: ITopProps) => {
	const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();
	const [scores, setScores] = useState<IScore[]>([]);

	useEffect(() => {
		if (isOffline) {
			const topScores = getLocalStorageItem<IScore[]>(SCORES_LOCAL_STORAGE_KEY);
			setScores(topScores ?? []);
		} else {
			socket.on(SocketEvent.SERVER_SEND_TOP_SCORES, (topScores: IScore[]) => {
				setScores(topScores);
			});
			socket.emit(SocketEvent.CLIENT_REQUEST_TOP_SCORES);
		}
		return () => {
			socket.off(SocketEvent.SERVER_SEND_TOP_SCORES);
		};
	}, [isOffline]);

	useEffect(() => {
		if (isOffline) return;
		setLocalStorageItem(SCORES_LOCAL_STORAGE_KEY, scores);
	}, [scores]);

	const topBtnStyle: CSSProperties = {
		fontSize: `${scaleRatio * 75}px`,
		bottom: `${offset.yOffset + scaleRatio * 25}px`,
		right: `${offset.xOffset + scaleRatio * 40}px`,
		padding: `${scaleRatio * 8}px`
	};

	const onClick = () => {
		clearScreen();
		setShowTopList(!showTopList);
	};

	const topListStyle: CSSProperties = {
		fontSize: `${scaleRatio * 65}px`,
		top: `${offset.yOffset + scaleRatio * 35}px`,
		paddingRight: `${scaleRatio * 20}px`
	};

	const topListItemStyle: CSSProperties = {
		marginBottom: `${scaleRatio * 8}px`
	};

	const noScoresYetStyle: CSSProperties = {
		marginTop: `${offset.yOffset + scaleRatio * 280}px`
	};

	return (
		<>
			{showTopList && (
				<div id="top-list" className="centered-horizontally" style={topListStyle}>
					{scores.length === 0 && <div style={noScoresYetStyle}>No scores yet!</div>}
					{scores.map((score, i) => (
						<TopListItem
							key={i}
							number={i + 1}
							initials={score.user}
							score={score.score}
							style={topListItemStyle}
						/>
					))}
				</div>
			)}
			<div id="top-btn" onClick={onClick} style={topBtnStyle}>
				TOP
			</div>
		</>
	);
};

interface ITopListItemProps {
	number: number;
	initials: string;
	score: number;
	style: CSSProperties;
}

const TopListItem = ({ number, initials, score, style }: ITopListItemProps) => {
	if (number < 10)
		return (
			<div className="top-list-item" style={style}>
				&nbsp;{number}.&nbsp;&nbsp;{initials}&nbsp;&nbsp;{score}
			</div>
		);
	return (
		<div className="top-list-item" style={style}>
			{number}.&nbsp;&nbsp;{initials}&nbsp;&nbsp;{score}
		</div>
	);
};
