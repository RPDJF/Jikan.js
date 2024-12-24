import { Character, CharacterFull } from "../models/character.ts";
import { BaseManager, BaseSearchParameters } from "./baseManager.ts";

export interface CharacterSearchParameters extends BaseSearchParameters {
	order_by?: "mal_id" | "name" | "favorites";
}

export class CharacterManager extends BaseManager {
	public readonly endpoint: string = "characters";

	public async getCharacters(params?: CharacterSearchParameters): Promise<Character[]> {
		try {
			const req = await this.client.requestManager.request(this._buildAPIRequestQuery(undefined, params));
			const json = await req.json();
			if (json.status < 200 || json.status >= 300) {
				throw new Error(`Error fetching characters: ${json.status} - ${json.message}`);
			}
			return json.data as Character[];
		} catch (e) {
			console.error(`Error fetching characters:`, e);
			throw e;
		}
	}

	public async getCharacter(characterId: number, params?: CharacterSearchParameters): Promise<CharacterFull> {
		try {
			const req = await this.client.requestManager.request(this._buildAPIRequestQuery(`${characterId}`, params, "full"));
			const json = await req.json();
			if (json.status < 200 || json.status >= 300) {
				throw new Error(`Error fetching character with ID ${characterId}: ${json.status} - ${json.message}`);
			}
			return json.data as CharacterFull;
		} catch (e) {
			console.error(`Error fetching character with ID ${characterId}:`, e);
			throw e;
		}
	}
	// TODO: Refactor getCharacterAnime and getCharacterManga to unify some code
	// TODO: Implement getCharacterAnime
	// TODO: Implement getCharacterManga
	// TODO: Implement getCharacterVoiceActors
	// TODO: Implement getCharacterPictures
}