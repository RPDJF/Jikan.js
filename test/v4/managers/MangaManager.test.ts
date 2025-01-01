// write tests for the MangaManager class

import { JikanClient } from "../../../src/index.ts";

function runMangaManagerTests(client: JikanClient) {
  // Tested value:
  // is the length of the array 5?
  /*Deno.test({
	name: "MangaManager.getMangas without parameters",
	sanitizeResources: false,
	sanitizeOps: false,
  }, async () => {
	const Mangas: Manga[] = await client.getMangas();
	if (!Mangas.length) {
	  throw new Error("The array is empty");
	}
  });*/

  // Tested values:
  // is the length of the array 5?
  /*Deno.test({
	name: "MangaManager.getMangas with parameters",
	sanitizeResources: false,
	sanitizeOps: false,
  }, async () => {
	const params: MangaSearchParameters = {
	  limit: 5,
	  order_by: MangaOrder.Name,
	  page: 2,
	  sort: "asc",
	};
	const Mangas: Manga[] = await client.getMangas(params);
	if (!Mangas.length) {
	  throw new Error("The array is empty");
	}
	if (Mangas.length !== 5) {
	  throw new Error("The array length is not 5");
	}
  });*/

  // Tested:
  // test each getter method in the MangaManager class
  Deno.test({
	name: "MangaManager getters",
	sanitizeResources: false,
	sanitizeOps: false,
  }, async () => {
	await Promise.all([
	  client.getManga(1).then((Manga) => {
		if (!Manga.mal_id) {
		  throw new Error("The mal_id is not defined");
		}
	  }),
	]);
  });
}

runMangaManagerTests(new JikanClient());
