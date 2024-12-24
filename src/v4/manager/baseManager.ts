import { APIRequestQuery } from "../core/api.ts";
import { JikanClient } from "../core/client.ts";

export enum BaseOrderBy {
	mal_id = "mal_id",
}

export interface BaseSearchParameters {
	page?: number;
	limit?: number;
	q?: string;
	sort?: "asc" | "desc";
	letter?: string;
};

export abstract class BaseManager {

	public readonly client: JikanClient;
	public readonly abstract endpoint: string;

	constructor(client: JikanClient) {
		this.client = client;
	}

	protected _buildAPIRequestQuery(subPath?:string, searchParams?: BaseSearchParameters, suffix?: string): APIRequestQuery {
		const params = new URLSearchParams();
		if (searchParams) {
			Object.entries(searchParams).forEach(([key, value]) => {
				if (value) {
					params.append(key, value.toString());
				}
			});
		}
		return {
			method: "GET",
			endpoint: `${this.endpoint}${subPath ? `/${subPath}` : ""}${suffix ? `/${suffix}` : ""}`,
			params: params,
		}
	}
}