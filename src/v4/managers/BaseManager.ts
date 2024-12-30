import { APIRequestQuery } from "../core/apiModels.ts";
import { JikanClient } from "../core/JikanClient.ts";

export enum BaseSort {
	asc = "asc",
	desc = "desc",
}

export interface BaseSearchParameters {
	page?: number;
	limit?: number;
	q?: string;
	sort?: BaseSort | string;
	letter?: string;
};

export abstract class BaseManager {

	public readonly client: JikanClient;
	public readonly abstract endpoint: string;

	constructor(client: JikanClient) {
		this.client = client;
	}

	protected _buildAPIRequestQuery(subPath?:string, searchParams?: BaseSearchParameters | object, suffix?: string): APIRequestQuery {
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

	protected async _fetchData<T>(query: APIRequestQuery): Promise<T> {
		try {
			const req = await this.client.requestManager.request(query);
			const json = await req.json();
			if (json.status < 200 || json.status >= 300) {
				console.error(`Error on APIRequestQuery:`, query);
				console.error(`Error fetching data:`, json);
				throw new Error(`Error fetching data: ${json.status} - ${json.message}`);
			}
			return json.data as T;
		} catch (e) {
			console.error(`Error fetching data:`, e);
			throw e;
		}
	}
}