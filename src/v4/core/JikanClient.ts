import { AnimeManager, AnimeReviewsParameters, AnimeSearchParameters } from "../managers/AnimeManager.ts";
import { CharacterManager, CharacterSearchParameters } from "../managers/CharacterManager.ts";
import * as AnimeModel from "../models/anime.ts";
import * as BaseModel from "../models/base.ts";
import * as CharacterModel from "../models/character.ts";
import { CacheManager, CacheOptions } from "./CacheManager.ts";
import { RequestManager } from "./RequestManager.ts";

export interface ClientOptions {
	/**
	 * Jikan http client host
	 * Change it if you want to use a different Jikan API host (e.g. local instance)
	 * 
	 * You also can use non-https host, but it's not recommended
	 * 
	 * Default https://api.jikan.moe
	 */
	host: string;

	/**
	 * The base pathname for the Jikan API.
	 * 
	 * Use this if you want to use a different Jikan API version
	 * 
	 * Default /v4
	 */
	baseUri: string;

	/**
	 * The rate limit interval in milliseconds
	 * 
	 * Default is 1050ms (57 requests per minute)
	 *
	 * Jikan API has a rate limit of 60 requests per minute and 3 requests per second
	 */
	rateLimit: number;

	/**
	 * Timeout for the request in milliseconds for each request to the Jikan API
	 * 
	 * This timeout isn't used or the internal pending requests queue, it's used for the request to the Jikan API
	 * 
	 * Default 10000ms (10 seconds)
	 */
	timeout: number;

	/**
	 * Maximum pending requests in the queue
	 * 
	 * This is used to limit the number of requests that can be made at the same time
	 * 
	 * If the queue is full, requests will drop and return a 503 Service Unavailable response
	 * 
	 * If the request is cached, it won't be counted as a pending request
	 * 
	 * Default 0 (no limit)
	 */
	maxPendingRequests: number;

	/**
	 * Cache options (optional)
	 */
	cacheOptions?: Partial<CacheOptions>;
};

export class JikanClient {
	private static setDefaultOptions(options?: Partial<ClientOptions>): ClientOptions {
		const defaultOptions: ClientOptions = {
			host: 'https://api.jikan.moe',
			baseUri: '/v4',
			rateLimit: 1050,
			timeout: 10000,
			maxPendingRequests: 0,
			cacheOptions: undefined,
		};
		return { ...defaultOptions, ...options };
	}

	public readonly options: ClientOptions;
	public readonly cacheManager: CacheManager;
	public readonly requestManager: RequestManager;
	public readonly characterManager: CharacterManager;
	public readonly animeManager: AnimeManager;

	public constructor (options?: Partial<ClientOptions>) {
		this.options = JikanClient.setDefaultOptions(options);
		this.cacheManager = new CacheManager(this.options.cacheOptions);
		this.requestManager = new RequestManager(this);
		this.characterManager = new CharacterManager(this);
		this.animeManager = new AnimeManager(this);
	}

	// Facade methods for the CharacterManager
	/**
	 * getCharacters: Get a Character array from the Jikan API
	 */
	public getCharacters(params?: CharacterSearchParameters): Promise<CharacterModel.Character[]> { return this.characterManager.getCharacters(params); }
	/**
	 * getCharacter: Get a Character from the Jikan API by its ID
	 */
	public getCharacter(characterId: number): Promise<CharacterModel.Character> { return this.characterManager.getCharacter(characterId); }
	/**
	 * getCharacterFull: Get a CharacterFull from the Jikan API by its ID
	 */
	public getCharacterFull(characterId: number): Promise<CharacterModel.Character> { return this.characterManager.getCharacterFull(characterId); }
	/**
	 * getCharacterAnime: Get a Character's Anime from the Jikan API by its ID
	 */
	public getCharacterAnime(characterId: number): Promise<CharacterModel.AnimeRole[]> { return this.characterManager.getCharacterAnime(characterId); }
	/**
	 * getCharacterManga: Get a Character's Manga from the Jikan API by its ID
	 */
	public getCharacterManga(characterId: number): Promise<CharacterModel.MangaRole[]> { return this.characterManager.getCharacterManga(characterId); }
	/**
	 * getCharacterVoiceActors: Get a Character's Voice Actors from the Jikan API by its ID
	 */
	public getCharacterVoiceActors(characterId: number): Promise<BaseModel.VoiceActors[]> { return this.characterManager.getCharacterVoiceActors(characterId); }
	/**
	 * getCharacterPictures: Get a Character's Pictures from the Jikan API by its ID
	 */
	public getCharacterPictures(characterId: number): Promise<BaseModel.CommonImage[]> { return this.characterManager.getCharacterPictures(characterId); }
	
	// Facade methods for the AnimeManager
	/**
	 * getAnimes: Get an Anime array from the Jikan API
	 */
	public getAnimes(params?: AnimeSearchParameters): Promise<AnimeModel.Anime[]> { return this.animeManager.getAnimes(params); }
	/**
	 * getAnimeFull: Get an AnimeFull from the Jikan API by its ID
	 */
	public getAnimeFull(animeId: number): Promise<AnimeModel.AnimeFull> { return this.animeManager.getAnimeFull(animeId); }
	/**
	 * getAnime: Get an Anime from the Jikan API by its ID
	 */
	public getAnime(animeId: number): Promise<AnimeModel.Anime> { return this.animeManager.getAnime(animeId); }
	/**
	 * getAnimeCharacters: Get an Anime's Characters from the Jikan API by its ID
	 */
	public getAnimeCharacters(animeId: number): Promise<AnimeModel.CharacterRole[]> { return this.animeManager.getAnimeCharacters(animeId); }
	/**
	 * getAnimeStaff: Get an Anime's Staff from the Jikan API by its ID
	 */
	public getAnimeStaff(animeId: number): Promise<BaseModel.Staff[]> { return this.animeManager.getAnimeStaff(animeId); }
	/**
	 * getAnimeEpisodes: Get an Anime's Episodes from the Jikan API by its ID
	 */
	public getAnimeEpisodes(animeId: number, params?: BaseModel.PageSearchParameter): Promise<AnimeModel.AnimeEpisode[]> { return this.animeManager.getAnimeEpisodes(animeId, params); }
	/**
	 * getAnimeEpisode: Get an Anime's Episode from the Jikan API by its ID and Episode number
	 */
	public getAnimeEpisode(animeId: number, episodeNumber: number): Promise<AnimeModel.AnimeEpisodeFull> { return this.animeManager.getAnimeEpisode(animeId, episodeNumber); }
	/**
	 * getAnimeNews: Get an Anime's News from the Jikan API by its ID
	 */
	public getAnimeNews(animeId: number, params?: BaseModel.PageSearchParameter): Promise<AnimeModel.AnimeNews[]> { return this.animeManager.getAnimeNews(animeId, params); }
	/**
	 * getAnimeForum: Get an Anime's Forum from the Jikan API by its ID
	 */
	public getAnimeForum(animeId: number): Promise<AnimeModel.AnimeForum[]> { return this.animeManager.getAnimeForum(animeId); }
	/**
	 * getAnimeVideos: Get an Anime's Videos from the Jikan API by its ID
	 */
	public getAnimeVideos(animeId: number): Promise<AnimeModel.AnimeVideo> { return this.animeManager.getAnimeVideos(animeId); }
	/**
	 * getAnimeVideosEpisodes: Get an Anime's Videos Episodes from the Jikan API by its ID
	 */
	public getAnimeVideosEpisodes(animeId: number, params?: BaseModel.PageSearchParameter): Promise<AnimeModel.VideoEpisode[]> { return this.animeManager.getAnimeVideosEpisodes(animeId, params); }
	/**
	 * getAnimePictures: Get an Anime's Pictures from the Jikan API by its ID
	 */
	public getAnimePictures(animeId: number): Promise<BaseModel.CommonImage[]> { return this.animeManager.getAnimePictures(animeId); }
	/**
	 * getAnimeStatistics: Get an Anime's Statistics from the Jikan API by its ID
	 */
	public getAnimeStatistics(animeId: number): Promise<AnimeModel.AnimeStatistics> { return this.animeManager.getAnimeStatistics(animeId); }
	/**
	 * getAnimeMoreInfo: Get an Anime's More Info from the Jikan API by its ID
	 */
	public getAnimeMoreInfo(animeId: number): Promise<AnimeModel.AnimeMoreInfo> { return this.animeManager.getAnimeMoreInfo(animeId); }
	/**
	 * getAnimeRecommendations: Get an Anime's Recommendations from the Jikan API by its ID
	 */
	public getAnimeRecommendations(animeId: number): Promise<AnimeModel.AnimeMeta[]> { return this.animeManager.getAnimeRecommendations(animeId); }
	/**
	 * getAnimeUserUpdates: Get an Anime's User Updates from the Jikan API by its ID
	 */
	public getAnimeUserUpdates(animeId: number): Promise<AnimeModel.AnimeUserUpdate[]> { return this.animeManager.getAnimeUserUpdates(animeId); }
	/**
	 * getAnimeReviews: Get an Anime's Reviews from the Jikan API by its ID
	 */
	public getAnimeReviews(animeId: number, params?: AnimeReviewsParameters): Promise<AnimeModel.AnimeReview[]> { return this.animeManager.getAnimeReviews(animeId, params); }
	/**
	 * getAnimeForum: Get an Anime's Forum from the Jikan API by its ID
	 */
	public getAnimeRelations(animeId: number): Promise<AnimeModel.Relation[]> { return this.animeManager.getAnimeRelations(animeId); }
	/**
	 * getAnimeThemes: Get an Anime's Themes from the Jikan API by its ID
	 */
	public getAnimeThemes(animeId: number): Promise<AnimeModel.Theme> { return this.animeManager.getAnimeThemes(animeId); }
	/**
	 * getAnimeExternal: Get an Anime's External Links from the Jikan API by its ID
	 */
	public getAnimeExternal(animeId: number): Promise<AnimeModel.External[]> { return this.animeManager.getAnimeExternal(animeId); }
	/**
	 * getAnimeStreaming: Get an Anime's Streaming Links from the Jikan API by its ID
	 */
	public getAnimeStreaming(animeId: number): Promise<AnimeModel.External[]> { return this.animeManager.getAnimeStreaming(animeId); }
}