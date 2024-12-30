import * as AnimeModel from "../models/anime.ts";
import { CommonImage, Staff } from "../models/base.ts";
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
	rating?: AnimeModel.Rating | string;
	sfw?: boolean;
	genres?: string;
	genres_exclude?: string;
	order_by?: AnimeOrder | string;
	producers?: string;
	start_date?: string;
	end_date?: string;
};

export interface EpisodeSearchParameters {
	page?: number;
}

export class AnimeManager extends BaseManager {
	public readonly endpoint: string = "anime";

	/**
	 * getAnimes: Get an Anime array from the Jikan API
	 */
	public getAnimes(params?: AnimeSearchParameters): Promise<AnimeModel.Anime[]> {
		return this._fetchData<AnimeModel.Anime[]>(this._buildAPIRequestQuery(undefined, params));
	}
	/**
	 * getAnimeFull: Get an AnimeFull from the Jikan API by its ID
	 */
	public getAnimeFull(animeId: number): Promise<AnimeModel.AnimeFull> {
		return this._fetchData<AnimeModel.AnimeFull>(this._buildAPIRequestQuery(animeId.toString(), undefined, "full"));
	}
	/**
	 * getAnime: Get an Anime from the Jikan API by its ID
	 */
	public getAnime(animeId: number): Promise<AnimeModel.Anime> {
		return this._fetchData<AnimeModel.Anime>(this._buildAPIRequestQuery(animeId.toString()));
	}
	/**
	 * getAnimeCharacters: Get an Anime's Characters from the Jikan API by its ID
	 */
	public getAnimeCharacters(animeId: number): Promise<AnimeModel.CharacterRole[]> {
		return this._fetchData<AnimeModel.CharacterRole[]>(this._buildAPIRequestQuery(animeId.toString(), undefined, "characters"));
	}
	/**
	 * getAnimeStaff: Get an Anime's Staff from the Jikan API by its ID
	 */
	public getAnimeStaff(animeId: number): Promise<Staff[]> {
		return this._fetchData<Staff[]>(this._buildAPIRequestQuery(animeId.toString(), undefined, "staff"));
	}
	/**
	 * getAnimeEpisodes: Get an Anime's Episodes from the Jikan API by its ID
	 */
	public getAnimeEpisodes(animeId: number, params?: EpisodeSearchParameters): Promise<AnimeModel.AnimeEpisode[]> {
		return this._fetchData<AnimeModel.AnimeEpisode[]>(this._buildAPIRequestQuery(animeId.toString(), params, "episodes"));
	}
	/**
	 * getAnimeEpisode: Get an Anime's Episode from the Jikan API by its ID and Episode number
	 */
	public getAnimeEpisode(animeId: number, episodeNumber: number): Promise<AnimeModel.AnimeEpisodeFull> {
		return this._fetchData<AnimeModel.AnimeEpisodeFull>(this._buildAPIRequestQuery(animeId.toString(), undefined, `episodes/${episodeNumber}`));
	}
	/**
	 * getAnimeNews: Get an Anime's News from the Jikan API by its ID
	 */
	public getAnimeNews(animeId: number): Promise<AnimeModel.AnimeNews[]> {
		return this._fetchData<AnimeModel.AnimeNews[]>(this._buildAPIRequestQuery(animeId.toString(), undefined, "news"));
	}
	/**
	 * getAnimeForum: Get an Anime's Forum from the Jikan API by its ID
	 */
	public getAnimeForum(animeId: number): Promise<AnimeModel.AnimeForum[]> {
		return this._fetchData<AnimeModel.AnimeForum[]>(this._buildAPIRequestQuery(animeId.toString(), undefined, "forum"));
	}
	/**
	 * getAnimeVideos: Get an Anime's Videos from the Jikan API by its ID
	 */
	public getAnimeVideos(animeId: number): Promise<AnimeModel.AnimeVideo> {
		return this._fetchData<AnimeModel.AnimeVideo>(this._buildAPIRequestQuery(animeId.toString(), undefined, "videos"));
	}
	/**
	 * getAnimeVideosEpisodes: Get an Anime's Videos
	 */
	public getAnimeVideosEpisodes(animeId: number): Promise<AnimeModel.VideoEpisode[]> {
		return this._fetchData<AnimeModel.VideoEpisode[]>(this._buildAPIRequestQuery(animeId.toString(), undefined, "videos/episodes"));
	}
	/**
	 * getAnimePictures: Get an Anime's Pictures from the Jikan API by its ID
	 */
	public getAnimePictures(animeId: number): Promise<CommonImage[]> {
		return this._fetchData<CommonImage[]>(this._buildAPIRequestQuery(animeId.toString(), undefined, "pictures"));
	}
	/**
	 * getAnimeStatistics: Get an Anime's statistics from the Jikan API by its ID
	 */
	public getAnimeStatistics(animeId: number): Promise<AnimeModel.AnimeStatistics> {
		return this._fetchData<AnimeModel.AnimeStatistics>(this._buildAPIRequestQuery(animeId.toString(), undefined, "statistics"));
	}
	/**
	 * getAnimeMoreInfo: Get an Anime's More Info from the Jikan API by its ID
	 */
	public getAnimeMoreInfo(animeId: number): Promise<AnimeModel.AnimeMoreInfo> {
		return this._fetchData<AnimeModel.AnimeMoreInfo>(this._buildAPIRequestQuery(animeId.toString(), undefined, "moreinfo"));
	}
	// TODO: AnimeRecommendations
	// TODO: AnimeUserUpdates
	// TODO: AnimeReviews
	// TODO: AnimeRelations
	// TODO: AnimeThemes
	// TODO: AnimeExternal
	// TODO: AnimeStreaming
}