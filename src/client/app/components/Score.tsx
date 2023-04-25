import React, { CSSProperties } from "react";

interface IScoreProps {
	score: number;
	scaleRatio: number;
	offset: { xOffset: number; yOffset: number };
}

export const Score = ({ score, scaleRatio, offset }: IScoreProps) => {
	const style: CSSProperties = {
		paddingLeft: `${scaleRatio * 14}px`,
		bottom: `${offset.yOffset}px`,
		fontSize: `${scaleRatio * 100}px`
	};
	return (
		<div id="score" className="centered-horizontally" style={style}>
			{score}
		</div>
	);
};
