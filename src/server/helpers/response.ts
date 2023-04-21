import { Response } from "express";

import { IResponse } from "@shared";
import { CommonError } from "@types";

export const sendSuccess = <T>(res: Response, data: T) => {
	res.status(200).send({
		ok: true,
		status: 200,
		data
	} as IResponse<T>);
};

export const sendError = <T extends CommonError>(res: Response, error: T) => {
	res.status(error.status ?? 500).send({
		ok: false,
		status: error.status ?? 500,
		data: error.message ?? "Internal server error"
	} as IResponse<string>);
};
