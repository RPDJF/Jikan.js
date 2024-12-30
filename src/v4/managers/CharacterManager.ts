import { CommonImage, VoiceActors } from "../models/base.ts";
import { MangaRole } from "../models/character.ts";
import { AnimeRole, Character, CharacterFull } from "../models/character.ts";
import { BaseManager, BaseSearchParameters } from "./BaseManager.ts";

export enum CharacterOrder {
  mal_id = "mal_id",
  Name = "name",
  Favorites = "favorites",
}

export interface CharacterSearchParameters extends BaseSearchParameters {
  order_by?: CharacterOrder | string;
}

export class CharacterManager extends BaseManager {
  public readonly endpoint: string = "characters";

  /* getCharacters: Get a Character array from the Jikan API
	 *
	 * This method may throw an error if status is not between 200 and 300
	 */
  public getCharacters(
    params?: CharacterSearchParameters,
  ): Promise<Character[]> {
    return this._fetchData<Character[]>(
      this._buildAPIRequestQuery(undefined, params),
    );
  }

  /** getCharacter: Get a Character from the Jikan API by its ID
   *
   * This method may throw an error if status is not between 200 and 300
   */
  public getCharacter(characterId: number): Promise<Character> {
    return this._fetchData<Character>(
      this._buildAPIRequestQuery(characterId.toString()),
    );
  }

  /** getCharacter: Get a CharacterFull from the Jikan API by its ID
   *
   * This method may throw an error if status is not between 200 and 300
   */
  public getCharacterFull(characterId: number): Promise<CharacterFull> {
    return this._fetchData<CharacterFull>(
      this._buildAPIRequestQuery(characterId.toString(), undefined, "full"),
    );
  }

  /** getCharacterAnime: Get a Character's Anime from the Jikan API by its ID
   *
   * This method may throw an error if status is not between 200 and 300
   */
  public getCharacterAnime(characterId: number): Promise<AnimeRole[]> {
    return this._fetchData<AnimeRole[]>(
      this._buildAPIRequestQuery(characterId.toString(), undefined, "anime"),
    );
  }

  /** getCharacterManga: Get a Character's Manga from the Jikan API by its ID
   *
   * This method may throw an error if status is not between 200 and 300
   */
  public getCharacterManga(characterId: number): Promise<MangaRole[]> {
    return this._fetchData<MangaRole[]>(
      this._buildAPIRequestQuery(characterId.toString(), undefined, "manga"),
    );
  }

  /** getCharacterVoiceActors: Get a Character's Voice Actors from the Jikan API by its ID
   *
   * This method may throw an error if status is not between 200 and 300
   */
  public getCharacterVoiceActors(characterId: number): Promise<VoiceActors[]> {
    return this._fetchData<VoiceActors[]>(
      this._buildAPIRequestQuery(characterId.toString(), undefined, "voices"),
    );
  }

  /** getCharacterPictures: Get a Character's Pictures from the Jikan API by its ID
   *
   * This method may throw an error if status is not between 200 and 300
   */
  public getCharacterPictures(characterId: number): Promise<CommonImage[]> {
    return this._fetchData<CommonImage[]>(
      this._buildAPIRequestQuery(characterId.toString(), undefined, "pictures"),
    );
  }
}
