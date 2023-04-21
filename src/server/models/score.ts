import { model, Schema } from "mongoose";

import { BaseSchema } from "@models";
import { IScore } from "@shared";
import { IScoreModel } from "@types";

const ScoreSchema = new Schema<IScore>({
	user: {
		type: String,
		required: true
	},
	score: {
		type: Number,
		required: true
	}
}).add(BaseSchema);

export const Score = model<IScore, IScoreModel>("Score", ScoreSchema);
