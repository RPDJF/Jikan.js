// main.test.ts: this is a test file to run all the tests of jikan.js

import { JikanClient } from "../src/index.ts";

Deno.test({
	name: "Setup JikanClient",
	sanitizeResources: false,
	sanitizeOps: false,
}, () => {
	const client = new JikanClient();
})