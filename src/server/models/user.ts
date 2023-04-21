import { model, Schema } from "mongoose";

import { BaseSchema } from "@models";
import { IUser } from "@shared";
import { IUserModel } from "@types";

const UserSchema = new Schema<IUser>({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: false
	}
}).add(BaseSchema);

export const User = model<IUser, IUserModel>("User", UserSchema);
