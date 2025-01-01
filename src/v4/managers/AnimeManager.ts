import { animeModel, baseManager, baseModel } from "../index.ts";

/**
 * AnimeForumFilter: Enum for Anime Forum filters
 * (i.e. All, Episode, Other)
 */
export enum AnimeForumFilter {
  All = "all",
  Episode = "episode",
  Other = "other",
}

/**
 * AnimeRating: Enum for Anime ratings
 * (i.e. G, PG, PG-13, etc.)
 */
export enum AnimeRating {
  G = "G - All Ages",
  PG = "PG - Children",
  PG13 = "PG-13 - Teens 13 or older",
  R17 = "R - 17+ (violence & profanity)",
  R = "R+ - Mild Nudity",
  RX = "Rx - Hentai",
}

/**
 * AnimeType: Enum for Anime types
 * (i.e. TV, Movie, OVA, etc.)
 */
export enum AnimeType {
  TV = "tv",
  Movie = "movie",
  OVA = "ova",
  Special = "special",
  ONA = "ona",
  Music = "music",
  CM = "cm",
  PV = "pv",
  TVSpecial = "tv_special",
}

/**
 * AnimeStatus: Enum for Anime statuses
 * (i.e. Airing, Complete, Upcoming)
 */
export enum AnimeStatus {
  Airing = "airing",
  Complete = "complete",
  Upcoming = "upcoming",
}

/**
 * AnimeOrder: Enum for Anime orders
 * (i.e. MalId, Title, StartDate, etc.)
 */
export enum AnimeOrder {
  MalId = "mal_id",
  Title = "title",
  StartDate = "start_date",
  EndDate = "end_date",
  Score = "score",
  ScoredBy = "scored_by",
  Rank = "rank",
  Popularity = "popularity",
  Members = "members",
  Favorites = "favorites",
}

/**
 * AnimeSearchParameters: Interface for Anime search parameters
 */
export interface AnimeSearchParameters
  extends baseManager.BaseSearchParameters {
  unapproved?: boolean;
  type?: AnimeType | string;
  score?: number;
  min_score?: number;
  max_score?: number;
  status?: AnimeStatus | string;
  rating?: AnimeRating | string;
  sfw?: boolean;
  genres?: string;
  genres_exclude?: string;
  order_by?: AnimeOrder | string;
  producers?: string;
  start_date?: string;
  end_date?: string;
}

/**
 * AnimeForumSearchParameters: Interface for Anime Forum search parameters
 */
export interface AnimeForumSearchParameters {
  filter: AnimeForumFilter | string;
}

/**
 * AnimeReviewsParameters: Interface for Anime Reviews search parameters
 */
export interface AnimeReviewsParameters extends baseModel.PageSearchParameter {
  preliminary?: boolean;
  spoiler?: boolean;
}

/**
 * AnimeManager: Manager for Anime
 * This component is used to get Anime data from the Jikan API
 */
export class AnimeManager extends baseManager.BaseManager {
  public readonly endpoint: string = "anime";

  /**
   * getAnimes: Get an Anime array from the Jikan API
   * @throws Error if status is not between 200 and 300
   */
  public getAnimes(
    params?: AnimeSearchParameters,
  ): Promise<animeModel.Anime[]> {
    return this._fetchData<animeModel.Anime[]>(
      this._buildAPIRequestQuery(undefined, params),
    );
  }
  /**
   * getAnimeFull: Get an AnimeFull from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeFull(animeId: number): Promise<animeModel.AnimeFull> {
    return this._fetchData<animeModel.AnimeFull>(
      this._buildAPIRequestQuery(animeId.toString(), undefined, "full"),
    );
  }
  /**
   * getAnime: Get an Anime from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnime(animeId: number): Promise<animeModel.Anime> {
    return this._fetchData<animeModel.Anime>(
      this._buildAPIRequestQuery(animeId.toString()),
    );
  }
  /**
   * getAnimeCharacters: Get an Anime's Characters from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeCharacters(
    animeId: number,
  ): Promise<animeModel.CharacterRole[]> {
    return this._fetchData<animeModel.CharacterRole[]>(
      this._buildAPIRequestQuery(animeId.toString(), undefined, "characters"),
    );
  }
  /**
   * getAnimeStaff: Get an Anime's Staff from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeStaff(animeId: number): Promise<baseModel.Staff[]> {
    return this._fetchData<baseModel.Staff[]>(
      this._buildAPIRequestQuery(animeId.toString(), undefined, "staff"),
    );
  }
  /**
   * getAnimeEpisodes: Get an Anime's Episodes from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeEpisodes(
    animeId: number,
    params?: baseModel.PageSearchParameter,
  ): Promise<animeModel.AnimeEpisode[]> {
    return this._fetchData<animeModel.AnimeEpisode[]>(
      this._buildAPIRequestQuery(animeId.toString(), params, "episodes"),
    );
  }
  /**
   * getAnimeEpisode: Get an Anime's Episode from the Jikan API by its ID and Episode number
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeEpisode(
    animeId: number,
    episodeNumber: number,
  ): Promise<animeModel.AnimeEpisodeFull> {
    return this._fetchData<animeModel.AnimeEpisodeFull>(
      this._buildAPIRequestQuery(
        animeId.toString(),
        undefined,
        `episodes/${episodeNumber}`,
      ),
    );
  }
  /**
   * getAnimeNews: Get an Anime's News from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeNews(
    animeId: number,
    params?: baseModel.PageSearchParameter,
  ): Promise<animeModel.AnimeNews[]> {
    return this._fetchData<animeModel.AnimeNews[]>(
      this._buildAPIRequestQuery(animeId.toString(), params, "news"),
    );
  }
  /**
   * getAnimeForum: Get an Anime's Forum from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeForum(
    animeId: number,
    params?: AnimeForumSearchParameters,
  ): Promise<animeModel.AnimeForum[]> {
    return this._fetchData<animeModel.AnimeForum[]>(
      this._buildAPIRequestQuery(animeId.toString(), params, "forum"),
    );
  }
  /**
   * getAnimeVideos: Get an Anime's Videos from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeVideos(animeId: number): Promise<animeModel.AnimeVideo> {
    return this._fetchData<animeModel.AnimeVideo>(
      this._buildAPIRequestQuery(animeId.toString(), undefined, "videos"),
    );
  }
  /**
   * getAnimeVideosEpisodes: Get an Anime's Videos
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeVideosEpisodes(
    animeId: number,
    params?: baseModel.PageSearchParameter,
  ): Promise<animeModel.VideoEpisode[]> {
    return this._fetchData<animeModel.VideoEpisode[]>(
      this._buildAPIRequestQuery(animeId.toString(), params, "videos/episodes"),
    );
  }
  /**
   * getAnimePictures: Get an Anime's Pictures from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimePictures(animeId: number): Promise<baseModel.CommonImage[]> {
    return this._fetchData<baseModel.CommonImage[]>(
      this._buildAPIRequestQuery(animeId.toString(), undefined, "pictures"),
    );
  }
  /**
   * getAnimeStatistics: Get an Anime's statistics from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeStatistics(
    animeId: number,
  ): Promise<animeModel.AnimeStatistics> {
    return this._fetchData<animeModel.AnimeStatistics>(
      this._buildAPIRequestQuery(animeId.toString(), undefined, "statistics"),
    );
  }
  /**
   * getAnimeMoreInfo: Get an Anime's More Info from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeMoreInfo(animeId: number): Promise<animeModel.AnimeMoreInfo> {
    return this._fetchData<animeModel.AnimeMoreInfo>(
      this._buildAPIRequestQuery(animeId.toString(), undefined, "moreinfo"),
    );
  }
  /**
   * getAnimeRecommendations: Get an Anime's Recommendations from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeRecommendations(
    animeId: number,
  ): Promise<animeModel.AnimeMeta[]> {
    return this._fetchData<animeModel.AnimeMeta[]>(
      this._buildAPIRequestQuery(
        animeId.toString(),
        undefined,
        "recommendations",
      ),
    );
  }
  /**
   * getAnimeUserUpdates: Get an Anime's User Updates from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeUserUpdates(
    animeId: number,
    params?: baseModel.PageSearchParameter,
  ): Promise<animeModel.AnimeUserUpdate[]> {
    return this._fetchData<animeModel.AnimeUserUpdate[]>(
      this._buildAPIRequestQuery(animeId.toString(), params, "userupdates"),
    );
  }
  /**
   * getAnimeReviews: Get an Anime's Reviews from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeReviews(
    animeId: number,
    params?: AnimeReviewsParameters,
  ): Promise<animeModel.AnimeReview[]> {
    return this._fetchData<animeModel.AnimeReview[]>(
      this._buildAPIRequestQuery(animeId.toString(), params, "reviews"),
    );
  }
  /**
   * getAnimeRelations: Get an Anime's Relations from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeRelations(animeId: number): Promise<baseModel.Relation[]> {
    return this._fetchData<baseModel.Relation[]>(
      this._buildAPIRequestQuery(animeId.toString(), undefined, "relations"),
    );
  }
  /**
   * getAnimeThemes: Get an Anime's Themes from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeThemes(animeId: number): Promise<animeModel.Theme> {
    return this._fetchData<animeModel.Theme>(
      this._buildAPIRequestQuery(animeId.toString(), undefined, "themes"),
    );
  }
  /**
   * getAnimeExternal: Get an Anime's External from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeExternal(animeId: number): Promise<baseModel.External[]> {
    return this._fetchData<baseModel.External[]>(
      this._buildAPIRequestQuery(animeId.toString(), undefined, "external"),
    );
  }
  /**
   * getAnimeStreaming: Get an Anime's Streaming from the Jikan API by its ID
   * @throws Error if status is not between 200 and 300
   */
  public getAnimeStreaming(animeId: number): Promise<baseModel.External[]> {
    return this._fetchData<baseModel.External[]>(
      this._buildAPIRequestQuery(animeId.toString(), undefined, "streaming"),
    );
  }
}
