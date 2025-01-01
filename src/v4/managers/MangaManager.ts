import { baseManager } from "../index.ts";

/**
 * MangaManager: Manager for the Manga endpoint
 * This component is used to get Manga data from the Jikan API
 */
export class MangaManager extends baseManager.BaseManager {
  public readonly endpoint: string = "manga";
}
