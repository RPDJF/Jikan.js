export interface CacheOptions {
	/**
	 * Cache expiration time in milliseconds
	 * 
	 * This is used to cache the response from the Jikan API, cache response won't be rate limited if it's still valid
	 * 
	 * Any modification of this value will be ignored during the program execution
	 * 
	 * Default 86400000 (1 day)
	 */
	cacheExpiration: number;

	/**
	 * Enable or disable the cache
	 * 
	 * Because of the limited rate limit of the Jikan API, it's recommended to enable the cache
	 * 
	 * Default true
	 */
	cache: boolean;

	/**
	 * Delete the cache when the program exits
	 * 
	 * note: Due to an issue with Deno, this option will add an event listener to the SIGINT signal in order exit the program and delete the cache
	 * 
	 * Any modification of this value will be ignored during the program execution
	 * 
	 * Default true
	 */
	deleteCacheOnExit: boolean;

	/**
	 * Data path for the cache
	 * 
	 * Default is the system temp directory
	 * 
	 * Any modification of this value will be ignored during the program execution
	 */
	cachePath: string;
};



export class CacheManager {
	private static setDefaultOptions(options?: Partial<CacheOptions>): CacheOptions {
		const defaultOptions: CacheOptions = {
			cacheExpiration: 86400000,
			cache: true,
			deleteCacheOnExit: true,
			cachePath: "",
		};
		return { ...defaultOptions, ...options };
	}

	/**
	 * Cache options containing the cache options
	 */
	private readonly options: CacheOptions;


	private _getDefaultCache(): string {
		let cache = this.options.cachePath;

		if(!this.options.cachePath) {
			cache = Deno.makeTempDirSync({ prefix: "jikanjs_" });
			console.info(`CacheManager: Created new cache at ${cache}.`);
		}
		else {
			Deno.mkdirSync(this.options.cachePath, { recursive: true });
			console.info(`CacheManager: Using cache at ${cache}.`);
		}

		return cache;
	}
	public constructor(options?: Partial<CacheOptions>) {
		this.options = CacheManager.setDefaultOptions(options);

		// cache initialization
		if (this.options.cache && !this.options.cachePath) {
			this.options.cachePath = this._getDefaultCache();
			if (this.options.deleteCacheOnExit) {
				self.addEventListener("unload", () => {
					console.warn(`CacheManager: Deleting cache... ${this.options.cachePath}`);
					Deno.removeSync(this.options.cachePath);
					console.info(`CacheManager: Cache deleted.`);
				});
				Deno.addSignalListener("SIGINT", () => {
					console.warn(`CacheManager: SIGINT Signal received.`);
					Deno.exit(0);
				});
			}
		}
	}

	public get cachePath(): string {
		return this.options.cachePath;
	}
}