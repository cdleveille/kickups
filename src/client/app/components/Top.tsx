import React, { CSSProperties, useEffect, useState } from "react";

import { socket } from "@app";
import { IScore, SocketEvent } from "@shared";

interface ITopProps {
	scaleRatio: number;
	offset: { xOffset: number; yOffset: number };
	showTopList: boolean;
	setShowTopList: (showTopList: boolean) => void;
	clearScreen: () => void;
}

export const Top = ({ scaleRatio, offset, showTopList, setShowTopList, clearScreen }: ITopProps) => {
	const [scores, setScores] = useState<IScore[]>([]);

	useEffect(() => {
		socket.on(SocketEvent.SERVER_SEND_TOP_SCORES, (topScores: IScore[]) => {
			setScores(topScores);
		});
		socket.emit(SocketEvent.CLIENT_REQUEST_TOP_SCORES);
		return () => {
			socket.off(SocketEvent.SERVER_SEND_TOP_SCORES);
		};
	}, []);

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
		top: `${offset.yOffset + scaleRatio * 35}px`
	};

	const topListItemStyle: CSSProperties = {
		marginBottom: `${scaleRatio * 8}px`
	};

	return (
		<>
			{showTopList && (
				<div id="top-list" className="centered-horizontally" style={topListStyle}>
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
