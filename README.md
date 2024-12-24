<img src="meta/banner.svg" alt="Jikan.js Banner" style="border-radius: 15px;">

# Jikan.js - Unofficial Jikan API Wrapper for Deno

Jikan.js is a simple, easy-to-use and efficient wrapper for [Jikan API](https://github.com/jikan-me/jikan) written in TypeScript for Deno.

This library provides a queue system to prevent rate limiting and allows you to fetch data from the Jikan API with ease. The library is designed to be simple and flexible, you can use it with your own self-hosted Jikan API or the official Jikan API (by default).

## Warning ⚠️ - And contribution
This library is still in development and is not ready for production use. The main features are not implemented yet, and the library is not stable and really not ready for use. I want to make the first release by myself as an exercise to learn Deno, and then I'll open the project for contributions.

Plus, this library is my first one, my first Deno project, first TypeScript project and mainly my first real project. So, don't expect too much from me, I'm still learning. Feel free to open an issue if you find a bug or bad code, I'll be happy to learn from you.

## What even is Jikan API?
Jikan API is an unofficial MyAnimeList PHP API that scrapes data from MyAnimeList. It is a RESTful API that provides data for anime, manga, characters, people, search, top, season, schedule, and genre.

Why not using the official MyAnimeList API then ? Well, these lazy bums at MyAnimeList don't have features like getting Character and Staff information, and don't even provide useful information like API rate limits. Jikan API is a community-driven project that provides a simple and easy-to-use API for MyAnimeList data.

However, Jikan API doesn't have support for authenticated requests; I'll give that a shot in the future for this library.

## Why Deno?
No real reason, I just wanted to try out Deno. I've been using Node.js for a long time, and I wanted to see how Deno is different from Node.js. I've heard that Deno is more secure, has better performance, and has a better module system than Node.js. So, I thought why not give it a try.

## Features
Jikan.js will provide you with the following features in his first release:
- Fetch data from the Jikan API with ease.
- Queue system to prevent rate limiting.
- Interfaced responses for easy access to data.
- Cache system to store responses for a certain amount of time.

## License 📜
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. ( Just want some credit for this repo if you use this library in your project 😉 )