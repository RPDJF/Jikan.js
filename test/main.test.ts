// main.test.ts: this is a test file to run all the tests of jikan.js

import { JikanClient } from "../src/index.ts";
import runCacheManagerTests from "./v4/core/CacheManager.test.ts";
import runRequestManagerTests from "./v4/core/RequestManager.test.ts";
import runAnimeManagerTests from "./v4/managers/AnimeManager.test.ts";
import runCharacterManagerTests from "./v4/managers/CharacterManager.test.ts";

const _client = new JikanClient();
runCacheManagerTests(_client);
runRequestManagerTests(_client);
runCharacterManagerTests(_client);
runAnimeManagerTests(_client);