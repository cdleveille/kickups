import { NextFunction, Request, Response, Router } from "express";

import { getTopScores } from "@helpers";
import { Routes, TOP_SCORES_LIMIT } from "@types";

export const router = Router();

router.get(Routes.TOP, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const limit = req.query.limit as string;
		const limitNum = parseInt(limit) || TOP_SCORES_LIMIT;
		const topScores = await getTopScores(limitNum);
		return res.status(200).json(topScores);
	} catch (error) {
		next(error);
	}
});

