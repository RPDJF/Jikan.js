// write tests for the AnimeManager class

import { JikanClient } from "../../../src/index.ts";
import { AnimeSearchParameters, AnimeStatus } from "../../../src/v4/managers/AnimeManager.ts";
import { Anime } from "../../../src/v4/models/anime.ts";

const client = new JikanClient();

console.info("Running tests for AnimeManager");

async function waitBeforeExit() {
	await new Promise(resolve => setTimeout(resolve, client.options.rateLimit + 50));
}

// Tested value:
// is the length of the array 5?
Deno.test("AnimeManager.getAnimes without parameters", async () => {
	const animes: Anime[] = await client.getAnimes();
	if (!animes.length) {
		throw new Error("The array is empty");
	}
	await waitBeforeExit();
});

// Tested values:
// is the length of the array 5?
// is the score of each anime between 4 and 7?
Deno.test("AnimeManager.getAnimes with parameters", async () => {
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
	await waitBeforeExit();
});