/**
 * ![Jikan.js banner](https://raw.githubusercontent.com/RPDJF/Jikan.js/main/meta/banner.svg)
 *
 * # Jikan.js - Unofficial Jikan API Wrapper for Deno 🚀
 *
 * ![Development Status](https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge&logo=github)
 * ![Test Status](https://raw.githubusercontent.com/RPDJF/Jikan.js/refs/heads/main/meta/statusBadge.svg)
 *
 * ![Deno badge](https://img.shields.io/badge/Deno-464647?style=for-the-badge&logo=deno&logoColor=white)
 * ![TypeScript badge](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
 *
 * **Jikan.js** is a **simple**, **efficient**, and **easy-to-use** library for
 * interacting with the [Jikan API](https://github.com/jikan-me/jikan) — a RESTful
 * API that brings MyAnimeList data to your fingertips!
 *
 * Built with ❤️ in TypeScript, Jikan.js is designed for Deno and comes with
 * powerful features like **rate-limiting**, **caching**, and **self-hosted API
 * support**. Whether you're building the next anime tracker or just want to fetch
 * your favorite characters, Jikan.js has you covered!
 *
 * ⚠️ **Heads up!** This library is still a work in progress. The first release is
 * coming soon, but you're welcome to follow along and share your feedback! 🙌
 *
 * ---
 *
 * ## 🌟 Features (So Far...)
 *
 * - ✅ Fetch data effortlessly from the Jikan API.
 * - ✅ Queue system to handle rate limits like a champ.
 * - ✅ Interfaced responses for clean and easy data handling.
 * - 🔄 Cache system to store responses for reuse (**in progress**).
 * - ✅ Support for self-hosted Jikan API setups.
 *
 * 💡 **Coming Soon:**
 *
 * - Full Jikan API v4 support, NodeJS support (or alternative repo), automatic
 *   retries, and more!
 *
 * ---
 *
 * ## 🚀 Getting Started
 *
 * ### 🛠️ Importing the Library
 *
 * **Note:** This library isn’t on the Deno registry yet. Stay tuned for updates!
 *
 * To try it out now:
 *
 * ```typescript
 * import { JikanClient } from "https://raw.githubusercontent.com/RPDJF/Jikan.js/refs/heads/main/src/index.ts";
 * ```
 *
 * ### 🎯 Example Usage
 *
 * Here is an example of how you can use the library to fetch data from the Jikan
 * API:
 *
 * ```typescript
 * const client = new JikanClient();
 *
 * client.getCharacter(1).then((character) => {
 *   console.log(character.name);
 * });
 * ```
 *
 * You also can use your own self-hosted Jikan API:
 *
 * ```typescript
 * const client = new JikanClient({
 *   host: "https://my-jikan-api.com",
 *   baseUri: "/v4",
 * });
 * ```
 *
 * **Pro Tip**: Always handle errors gracefully:
 *
 * ```typescript
 * try {
 *   const character = await client.getCharacter(1);
 *   console.log(character.name);
 * } catch (error) {
 *   console.error(error);
 * }
 * ```
 *
 * ---
 *
 * ## 🌌 Why Deno?
 *
 * Deno is **secure**, **fast**, and **modern** — the perfect playground for this
 * library! Plus, it’s a refreshing break from Node.js. 🦕
 *
 * ---
 *
 * ## 🛤️ What’s Next?
 *
 * I’m just getting started! Stay tuned for more features and a polished first
 * release. Want to contribute or share ideas? Open an issue or fork the repo — I’d
 * love to learn from you! 😊
 *
 * ---
 *
 * ✨ **Let’s build something awesome together!** ✨
 *
 * @module Jikan.js
 */

export * from "./core/JikanClient.ts";
export * as cacheManager from "./core/CacheManager.ts";
export * as requestManager from "./core/RequestManager.ts";
export * as baseManager from "./managers/BaseManager.ts";
export * as animeManager from "./managers/AnimeManager.ts";
export * as mangaManager from "./managers/MangaManager.ts";
export * as characterManager from "./managers/CharacterManager.ts";
export * as baseModel from "./models/base.ts";
export * as animeModel from "./models/anime.ts";
export * as characterModel from "./models/character.ts";
export * as userModel from "./models/user.ts";
