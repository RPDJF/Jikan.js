// write tests for the AnimeManager class

import { JikanClient } from "../../../src/index.ts";
import { AnimeSearchParameters, AnimeStatus } from "../../../src/v4/managers/AnimeManager.ts";
import { Anime } from "../../../src/v4/models/anime.ts";

export default function runAnimeManagerTests(client: JikanClient) {
	// Tested value:
	// is the length of the array 5?
	Deno.test({
		name: "AnimeManager.getAnimes without parameters",
		sanitizeResources: false,
		sanitizeOps: false,
	  }, async () => {
		const animes: Anime[] = await client.getAnimes();
		if (!animes.length) {
			throw new Error("The array is empty");
		}
	});

	// Tested values:
	// is the length of the array 5?
	// is the score of each anime between 4 and 7?
	Deno.test({
		name: "AnimeManager.getAnimes with parameters",
		sanitizeResources: false,
		sanitizeOps: false,
	  }, async () => {
		const params: AnimeSearchParameters = {
			limit: 5,
			min_score: 4,
			max_score: 7,
			page: 2,
			sort: "asc",
			status: AnimeStatus.Complete,
		}
		const animes: Anime[] = await client.getAnimes(params);
		if (!animes.length) {
			throw new Error("The array is empty");
		}
		if (animes.length !== 5) {
			throw new Error("The array length is not 5");
		}
		for(const anime of animes) {
			if (!anime.score) {
				console.warn("The score is not defined");
				continue ;
			}
			if(anime.score < 4 || anime.score > 7) {
				throw new Error("The score is not between 4 and 7");
			}
		}
	});

	// Tested:
	// test each getter method in the AnimeManager class
	Deno.test({
		name: "AnimeManager getters",
		sanitizeResources: false,
		sanitizeOps: false,
	}, async () => {
		await Promise.all([
			client.getAnime(1).then((anime) => {
				if (!anime.mal_id) {
					throw new Error("The mal_id is not defined");
				}
			}),
			client.getAnimeCharacters(1).then((characters) => {
				if (!characters.length) {
					throw new Error("The array is empty");
				}
			}),
			client.getAnimeEpisode(1, 1).then((episode) => {
				if (!episode.mal_id) {
					throw new Error("The mal_id is not defined");
				}
			}),
			client.getAnimeEpisodes(1).then((episodes) => {
				if (!episodes.length) {
					throw new Error("The array is empty");
				}
			}),
			client.getAnimeFull(1).then((anime) => {
				if (!anime.mal_id) {
					throw new Error("The mal_id is not defined");
				}
			}),
			client.getAnimeStaff(1).then((staff) => {
				if (!staff.length) {
					throw new Error("The array is empty");
				}
			}),
		]);
	});
}

runAnimeManagerTests(new JikanClient());