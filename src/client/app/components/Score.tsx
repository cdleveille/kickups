import React from "react";

interface IScoreProps {
	score: number;
}

export const Score = ({ score }: IScoreProps) => {
	return <div id="score">{score}</div>;
};
