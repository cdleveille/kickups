import { FilterQuery, Model, PopulateOptions, QueryOptions } from "mongoose";

import { IBase, IUser } from "@shared";

export interface IBaseModel<T extends IBase = IBase> extends Model<T> {
	assertFindOne(filter?: FilterQuery<T>, options?: Options<T>, projection?: Projection): Promise<T>;
	assertFind(filter?: FilterQuery<T>, options?: Options<T>, projection?: Projection): Promise<T[]>;
	createOrUpdate(filter: FilterQuery<T>, doc: Partial<T>): Promise<T>;
	assertExists(filter: FilterQuery<T>, options?: Options<T>): Promise<void>;
	getCount(filter: FilterQuery<T>, options?: Options<T>): Promise<number>;
}

export type IUserModel = IBaseModel<IUser>;

export type Projection = Record<string, 0 | 1>;

export interface Options<T extends IBase = IBase> extends QueryOptions {
	sort?: {
		// eslint-disable-next-line no-unused-vars
		[k in keyof Partial<T>]: 1 | -1 | number;
	};
	populate?: PopulateOptions[];
	limit?: number;
	skip?: number;
	new?: boolean;
}
