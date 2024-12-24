import { JikanClient } from "./index.ts";



const client = new JikanClient();

// This main is a simple example of how to use the library

async function main() {
	const res = await client.characterManager.getCharacter(1);
	console.log(res);
	console.log(res.name);
}

main();
