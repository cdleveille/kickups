export const TOP_SCORES_LIMIT = 10;

export enum SocketEvent {
	CLIENT_REQUEST_TOP_SCORES = "client-request-top-scores",
	CLIENT_SEND_NEW_SCORE = "client-send-new-score",
	SERVER_SEND_TOP_SCORES = "server-send-top-scores"
}

export enum Routes {
	ROOT = "/",
	TOP = "/top"
}

export enum Color {
	GRAY = "#333333"
}

export const INITIALS_LOCAL_STORAGE_KEY = "initials";

export const SCORES_LOCAL_STORAGE_KEY = "scores";

export enum Key {
	ESCAPE = "Escape",
	ONE = "1",
	TWO = "2"
}
