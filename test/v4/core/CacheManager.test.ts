import { JikanClient } from "../../../src/index.ts";

function runCacheManagerTests(client: JikanClient) {
  // Will test the cache manager from the client

  // Tested:
  // Check if the cache directory is created
  Deno.test("CacheManager cache", async () => {
    const _cacheManager = client.cacheManager;
    const _cachePath = _cacheManager.cachePath;

    // Check if the cache directory is created
    const cache = await Deno.stat(_cachePath || "");
    if (!cache.isDirectory) {
      throw new Error("The cache directory is not a directory");
    }
  });
}

runCacheManagerTests(new JikanClient());
