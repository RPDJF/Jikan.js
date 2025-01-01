// write tests for the MangaManager class

import { JikanClient, mangaManager, mangaModel } from "../../../src/index.ts";

function runMangaManagerTests(client: JikanClient) {
  // Tested value:
  // is the length of the array 5?
  Deno.test({
    name: "MangaManager.getMangas without parameters",
    sanitizeResources: false,
    sanitizeOps: false,
  }, async () => {
    const Mangas: mangaModel.Manga[] = await client.getMangas();
    if (!Mangas.length) {
      throw new Error("The array is empty");
    }
  });

  // Tested values:
  // is the length of the array 5?
  Deno.test({
    name: "MangaManager.getMangas with parameters",
    sanitizeResources: false,
    sanitizeOps: false,
  }, async () => {
    const params: mangaManager.MangaSearchParameters = {
      limit: 5,
      order_by: "title",
      page: 2,
      sort: "asc",
    };
    const Mangas: mangaModel.Manga[] = await client.getMangas(params);
    if (!Mangas.length) {
      throw new Error("The array is empty");
    }
    if (Mangas.length !== 5) {
      throw new Error("The array length is not 5");
    }
  });

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
      client.getMangaCharacters(1).then((characters) => {
        if (!characters.length) {
          throw new Error("The array is empty");
        }
      }),
      client.getMangaFull(1).then((Manga) => {
        if (!Manga.mal_id) {
          throw new Error("The mal_id is not defined");
        }
      }),
      client.getMangas().then((Mangas) => {
        if (!Mangas.length) {
          throw new Error("The array is empty");
        }
      }),
    ]);
  });
}

runMangaManagerTests(new JikanClient());
