import { JikanClient } from "./index.ts";



const client = new JikanClient();

// This main is a simple example of how to use the library

async function main() {
	//const res = client.characters.getCharacter(87275);
	const res = client.characters.getCharacters({page: 45, limit: 5});
	const character = await res;
	console.log("characters", character);
	console.log(character.length);
	console.log(character[1].name);
	/*console.log("character", character);
	console.log("mal_id", character.mal_id);
	console.log("url", character.url);
	console.log("images", character.images);
	console.log("jpg", character.images.jpg);
	console.log("webp", character.images.webp);
	console.log("name", character.name);
	console.log("name_kanji", character.name_kanji);
	console.log("nicknames", character.nicknames);
	console.log("nicknames[2]", character.nicknames[2]);
	console.log("favorites", character.favorites);
	console.log("about", character.about);
	console.log("anime", character.anime);*/
}

main();
