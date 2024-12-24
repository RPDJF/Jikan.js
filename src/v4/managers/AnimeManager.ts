import { Anime, AnimeFull, Rating, CharacterRole } from "../models/anime.ts";
import { Staff } from "../models/base.ts";
import { BaseManager, BaseSearchParameters } from "./BaseManager.ts";

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
};

export enum AnimeStatus {
	Airing = "airing",
	Complete = "complete",
	Upcoming = "upcoming",
};

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

export interface AnimeSearchParameters extends BaseSearchParameters {
	unapproved?: boolean;
	type?: AnimeType | string;
	score?: number;
	min_score?: number;
	max_score?: number;
	status?: AnimeStatus | string;
	rating?: Rating | string;
	sfw?: boolean;
	genres?: string;
	genres_exclude?: string;
	order_by?: AnimeOrder | string;
	producers?: string;
	start_date?: string;
	end_date?: string;
};

export class AnimeManager extends BaseManager {
	public readonly endpoint: string = "anime";

	/** getAnimes: Get an Anime array from the Jikan API
	 * 
	 * This method may throw an error if status is not between 200 and 300
	 */
	public getAnimes(params?: AnimeSearchParameters): Promise<Anime[]> {
		return this._fetchData<Anime[]>(this._buildAPIRequestQuery(undefined, params));
	}
	/** getAnimeFull: Get an AnimeFull from the Jikan API by its ID
	 * 
	 * This method may throw an error if status is not between 200 and 300
	 */
	public getAnimeFull(animeId: number): Promise<AnimeFull> {
		return this._fetchData<AnimeFull>(this._buildAPIRequestQuery(animeId.toString(), undefined, "full"));
	}
	/** getAnime: Get an Anime from the Jikan API by its ID
	 * 
	 * This method may throw an error if status is not between 200 and 300
	 */
	public getAnime(animeId: number): Promise<Anime> {
		return this._fetchData<Anime>(this._buildAPIRequestQuery(animeId.toString()));
	}
	/** getAnimeCharacters: Get an Anime's Characters from the Jikan API by its ID
	 * 
	 * This method may throw an error if status is not between 200 and 300
	 */
	public getAnimeCharacters(animeId: number): Promise<CharacterRole[]> {
		return this._fetchData<CharacterRole[]>(this._buildAPIRequestQuery(animeId.toString(), undefined, "characters"));
	}
	/** getAnimeStaff: Get an Anime's Staff from the Jikan API by its ID
	 * 
	 * This method may throw an error if status is not between 200 and 300
	 */
	public getAnimeStaff(animeId: number): Promise<Staff[]> {
		return this._fetchData<Staff[]>(this._buildAPIRequestQuery(animeId.toString(), undefined, "staff"));
	}
	// TODO: AnimeEpisodes
	// TODO: AnimeEpisodesById
	// TODO: AnimeNews
	// TODO: AnimeForum
	// TODO: AnimeVideos
	// TODO: AnimeVideosEpisodes
	// TODO: AnimePictures
	// TODO: AnimeStatistics
	// TODO: AnimeMoreInfo
	// TODO: AnimeRecommendations
	// TODO: AnimeUserUpdates
	// TODO: AnimeReviews
	// TODO: AnimeRelations
	// TODO: AnimeThemes
	// TODO: AnimeExternal
	// TODO: AnimeStreaming
}