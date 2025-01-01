import { baseManager, mangaModel } from "../index.ts";

/**
 * MangaSearchParameters: Interface for Manga search parameters
 */
export interface MangaSearchParameters
  extends baseManager.BaseSearchParameters {
  /**
   * This is a flag. When supplied it will include entries which are unapproved. Unapproved entries on MyAnimeList are those that are user submitted and have not yet been approved by MAL to show up on other pages. They will have their own specifc pages and are often removed resulting in a 404 error. You do not need to pass a value to it.
   */
  unapproved?: boolean;
  /**
   * Available Manga types
   */
  type?:
    | "manga"
    | "novel"
    | "lightnovel"
    | "oneshot"
    | "doujin"
    | "manhwa"
    | "manhua";
  score?: number;
  /**
   * Set a minimum score for results.
   */
  min_score?: number;
  /**
   * Set a maximum score for results.
   */
  max_score?: number;
  /**
   * Available Manga statuses
   */
  status?: "publishing" | "complete" | "hiatus" | "discontinued" | "upcoming";
  /**
   * Filter out Adult entries
   */
  sfw?: boolean;
  /**
   * Filter by genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
   */
  genres?: string;
  /**
   * Exclude genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
   */
  genres_exclude?: string;
  /**
   * Available Manga order_by properties
   */
  order_by?:
    | "mal_id"
    | "title"
    | "start_date"
    | "end_date"
    | "chapters"
    | "volumes"
    | "score"
    | "scored_by"
    | "rank"
    | "popularity"
    | "members"
    | "favorites";
  /**
   * Filter by magazine(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
   */
  magazine?: string;
  /**
   * Filter by starting date. Format: YYYY-MM-DD. e.g ``2022``, ``2005-05``, ``2005-01-01``
   */
  stard_date?: string;
  /**
   * Filter by ending date. Format: YYYY-MM-DD. e.g ``2022``, ``2005-05``, ``2005-01-01``
   */
  end_date?: string;
}

/**
 * MangaManager: Manager for the Manga endpoint
 * This component is used to get Manga data from the Jikan API
 */
export class MangaManager extends baseManager.BaseManager {
  public readonly endpoint: string = "manga";

  /**
   * getMangas: Get a list of Manga from the Jikan API
   * @throws Error if status is not between 200 and 300
   */
  public getMangas(
    params?: MangaSearchParameters,
  ): Promise<mangaModel.Manga[]> {
    return this._fetchData<mangaModel.Manga[]>(
      this._buildAPIRequestQuery(undefined, params),
    );
  }

  /**
   * getManga: Get a Manga from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getManga(mangaId: number): Promise<mangaModel.Manga> {
    return this._fetchData<mangaModel.Manga>(
      this._buildAPIRequestQuery(mangaId.toString()),
    );
  }

  /**
   * getMangaFull: Get a Manga from the Jikan API by its ID with full details
   * @throws Error if status is not between 200 and 300
   */
  public getMangaFull(mangaId: number): Promise<mangaModel.MangaFull> {
    return this._fetchData<mangaModel.MangaFull>(
      this._buildAPIRequestQuery(mangaId.toString(), undefined, "full"),
    );
  }

  /**
   * getMangaCharacters: Get a Manga's Characters from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getMangaCharacters(
    mangaId: number,
  ): Promise<mangaModel.MangaCharacterRole[]> {
    return this._fetchData<mangaModel.MangaCharacterRole[]>(
      this._buildAPIRequestQuery(mangaId.toString(), undefined, "characters"),
    );
  }
}
