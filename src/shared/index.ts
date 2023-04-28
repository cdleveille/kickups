/* eslint-disable no-unused-vars */

export interface IResponse<T> {
	ok: boolean;
	status: number;
	data: T;
}

export interface IBase {
	created_at: Date;
	updated_at: Date;
}

export interface IScore extends IBase {
	user: string;
	score: number;
}

export interface IEncryptedScore {
	user: string;
	score: string;
}

export const TOP_SCORES_LIMIT = 10;

export enum SocketEvent {
	CLIENT_REQUEST_TOP_SCORES = "client-request-top-scores",
	CLIENT_SEND_NEW_SCORE = "client-send-new-score",
	SERVER_SEND_TOP_SCORES = "server-send-top-scores"
}
