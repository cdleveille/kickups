import React, { useState } from "react";

import { Game } from "@app";
import { Canvas } from "@components";

export const App = () => {
	const [game] = useState<Game>(new Game());

	return (
		<>
			<Canvas game={game} />
		</>
	);
};
