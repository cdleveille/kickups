import { CSSProperties, useEffect, useState } from "react";

interface IScoreProps {
	score: number;
	streakEndScore: { value: number; switch: boolean };
	scaleRatio: number | undefined;
	offset: { xOffset: number; yOffset: number };
}

export const Score = ({ score, streakEndScore, scaleRatio = 1, offset }: IScoreProps) => {
	const [showStreakEndScore, setShowStreakEndScore] = useState(false);
	const [timeoutId, setTimeoutId] = useState<number>();

	useEffect(() => {
		if (streakEndScore?.value <= 0) return;
		setShowStreakEndScore(true);
		if (timeoutId) window.clearTimeout(timeoutId);
		const newTimeoutId = window.setTimeout(() => setShowStreakEndScore(false), 3000);
		setTimeoutId(newTimeoutId);
		return () => window.clearTimeout(newTimeoutId);
	}, [streakEndScore]);

	const scoreStyle: CSSProperties = {
		paddingLeft: `${scaleRatio * 16}px`,
		bottom: `${offset.yOffset - scaleRatio * 8}px`,
		fontSize: `${scaleRatio * 110}px`
	};

	const streakEndScoreStyle: CSSProperties = {
		paddingLeft: `${scaleRatio * 16}px`,
		top: `${offset.yOffset}px`,
		fontSize: `${scaleRatio * 110}px`
	};

	return (
		<>
			{showStreakEndScore && (
				<div id="streak-end-score" className="centered-horizontally" style={streakEndScoreStyle}>
					{streakEndScore.value}
				</div>
			)}
			<div id="score" className="centered-horizontally" style={scoreStyle}>
				{score}
			</div>
		</>
	);
};
