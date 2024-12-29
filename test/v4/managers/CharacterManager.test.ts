// write tests for the CharacterManager class

import { JikanClient } from "../../../src/index.ts";
import { CharacterOrder, CharacterSearchParameters } from "../../../src/v4/managers/CharacterManager.ts";
import { Character } from "../../../src/v4/models/character.ts";

export default function (client: JikanClient) {
	// Tested value:
	// is the length of the array 5?
	Deno.test({
		name: "CharacterManager.getCharacters without parameters",
		sanitizeResources: false,
		sanitizeOps: false,
	  }, async () => {
		const characters: Character[] = await client.getCharacters();
		if (!characters.length) {
			throw new Error("The array is empty");
		}
	});

	// Tested values:
	// is the length of the array 5?
	Deno.test({
		name: "CharacterManager.getCharacters with parameters",
		sanitizeResources: false,
		sanitizeOps: false,
	  }, async () => {
		const params: CharacterSearchParameters = {
			limit: 5,
			order_by: CharacterOrder.Name,
			page: 2,
			sort: "asc",
		}
		const characters: Character[] = await client.getCharacters(params);
		if (!characters.length) {
			throw new Error("The array is empty");
		}
		if (characters.length !== 5) {
			throw new Error("The array length is not 5");
		}
	});
}