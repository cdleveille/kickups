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
