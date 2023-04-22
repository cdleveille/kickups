import React, { CSSProperties } from "react";

interface IScoreProps {
	score: number;
	bottom: number;
	fontSize: number;
}

export const Score = ({ score, bottom, fontSize }: IScoreProps) => {
	const style: CSSProperties = {
		bottom: `${bottom}px`,
		fontSize: `${fontSize}px`
	};
	return (
		<div id="score" style={style}>
			{score}
		</div>
	);
};
