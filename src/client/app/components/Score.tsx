import React, { CSSProperties } from "react";

interface IScoreProps {
	score: number;
	scaleRatio: number;
	offset: { xOffset: number; yOffset: number };
}

export const Score = ({ score, scaleRatio, offset }: IScoreProps) => {
	const style: CSSProperties = {
		paddingLeft: `${scaleRatio * 16}px`,
		bottom: `${offset.yOffset - scaleRatio * 8}px`,
		fontSize: `${scaleRatio * 110}px`
	};

	return (
		<div id="score" className="centered-horizontally" style={style}>
			{score}
		</div>
	);
};
