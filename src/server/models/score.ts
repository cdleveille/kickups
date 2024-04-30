import { model, Schema } from "mongoose";

import { IBase, IScore } from "@types";

const BaseSchema = new Schema<IBase>({
	created_at: {
		type: Date,
		default: () => Date.now(),
		immutable: true
	},
	updated_at: {
		type: Date,
		default: () => Date.now()
	}
});

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

export const Score = model<IScore>("Score", ScoreSchema, "kickupsScores");
