export interface IConfig {
	IS_PROD: boolean;
	HOST: string;
	PORT: number;
	RELOAD_PORT: number;
	MONGO_URI: string;
	SKIP_DB: boolean;
}

export interface IBase {
	created_at: Date;
	updated_at: Date;
}

export interface IError {
	code: number;
	message: string;
}

export interface IScore {
	user: string;
	score: number;
}

export interface IEncryptedScore {
	user: string;
	score: string;
}

export interface IResize {
	width: number;
	height: number;
	xOffset: number;
	yOffset: number;
}
