import { baseManager, mangaModel } from "../index.ts";

/**
 * MangaManager: Manager for the Manga endpoint
 * This component is used to get Manga data from the Jikan API
 */
export class MangaManager extends baseManager.BaseManager {
  public readonly endpoint: string = "manga";

  /**
   * getManga: Get a Manga from the Jikan API by its ID
   */
  public getManga(mangaId: number): Promise<mangaModel.Manga> {
    return this._fetchData<mangaModel.Manga>(
      this._buildAPIRequestQuery(mangaId.toString()),
    );
  }
}
