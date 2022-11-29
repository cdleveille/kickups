import { NextFunction, Request, Response, Router } from "express";

import { sendError, sendSuccess } from "../helpers/response";
import { User } from "../models/user";
import { Routes } from "../types/constants";

export const router = Router();

router.get(Routes.helloWorld, async (req: Request, res: Response, next: NextFunction) => {
	try {
		return sendSuccess(res, "Hello World!");
	} catch (error) {
		sendError(res, error);
		next(error);
	}
});

router.get(Routes.user, async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await User.assertFindOne({ username: req.query.username });
		return sendSuccess(res, user);
	} catch (error) {
		sendError(res, error);
		next(error);
	}
});
