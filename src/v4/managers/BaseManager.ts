import * as apiModel from "../core/apiModels.ts";
import { JikanClient } from "../core/JikanClient.ts";

/**
 * BaseSort: Enum for base sorting
 */
export enum BaseSort {
  asc = "asc",
  desc = "desc",
}

/**
 * PageSearchParameter: Interface for page search parameter
 */
export interface PageSearchParameter {
  page?: number;
}

/**
 * BaseSearchParameters: Interface for base search parameters
 */
export interface BaseSearchParameters extends PageSearchParameter {
  limit?: number;
  q?: string;
  /**
   * Search query sort direction
   */
  sort?: "asc" | "desc";
  /**
   * Return entries starting with the specified letter
   */
  letter?: string;
}

/**
 * BaseManager: Base class for all managers
 * This component is an abstract class used to create managers for the Jikan API
 */
export abstract class BaseManager {
  public readonly client: JikanClient;
  public abstract readonly endpoint: string;

  constructor(client: JikanClient) {
    this.client = client;
  }

  protected _buildAPIRequestQuery(
    subPath?: string,
    searchParams?: BaseSearchParameters | object,
    suffix?: string,
  ): apiModel.APIRequestQuery {
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
      endpoint: `${this.endpoint}${subPath ? `/${subPath}` : ""}${
        suffix ? `/${suffix}` : ""
      }`,
      params: params,
    };
  }

  protected async _fetchData<T>(query: apiModel.APIRequestQuery): Promise<T> {
    try {
      const req = await this.client.requestManager.request(query);
      const json = await req.json();
      if (json.status < 200 || json.status >= 300) {
        console.error(`Error on APIRequestQuery:`, query);
        console.error(`Error fetching data:`, json);
        throw new Error(
          `Error fetching data: ${json.status} - ${json.message}`,
        );
      }
      return json.data as T;
    } catch (e) {
      console.error(`Error fetching data:`, e);
      throw e;
    }
  }
}
