import { CharacterManager, CharacterSearchParameters } from "../manager/CharacterManager.ts";
import { Image } from "../models/base.ts";
import { AnimeRole, Character, MangaRole, Voice } from "../models/character.ts";
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
	cacheOptions?: CacheOptions;
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

	public constructor (options?: Partial<ClientOptions>) {
		this.options = JikanClient.setDefaultOptions(options);
		this.cacheManager = new CacheManager(this.options.cacheOptions);
		this.requestManager = new RequestManager(this);
		this.characterManager = new CharacterManager(this);
	}

	// Facade methods for the CharacterManager
	/**
	 * getCharacters: Get a Character array from the Jikan API
	 */
	public getCharacters(params?: CharacterSearchParameters): Promise<Character[]> { return this.characterManager.getCharacters(params); }
	/**
	 * getCharacter: Get a Character from the Jikan API by its ID
	 */
	public getCharacter(characterId: number): Promise<Character> { return this.characterManager.getCharacter(characterId); }
	/**
	 * getCharacterFull: Get a CharacterFull from the Jikan API by its ID
	 */
	public getCharacterFull(characterId: number): Promise<Character> { return this.characterManager.getCharacterFull(characterId); }
	/**
	 * getCharacterAnime: Get a Character's Anime from the Jikan API by its ID
	 */
	public getCharacterAnime(characterId: number): Promise<AnimeRole[]> { return this.characterManager.getCharacterAnime(characterId); }
	/**
	 * getCharacterManga: Get a Character's Manga from the Jikan API by its ID
	 */
	public getCharacterManga(characterId: number): Promise<MangaRole[]> { return this.characterManager.getCharacterManga(characterId); }
	/**
	 * getCharacterVoiceActors: Get a Character's Voice Actors from the Jikan API by its ID
	 */
	public getCharacterVoiceActors(characterId: number): Promise<Voice[]> { return this.characterManager.getCharacterVoiceActors(characterId); }
	/**
	 * getCharacterPictures: Get a Character's Pictures from the Jikan API by its ID
	 */
	public getCharacterPictures(characterId: number): Promise<Image[]> { return this.characterManager.getCharacterPictures(characterId); }




}
