import { CommonImage, Ressource, VoiceActors } from "./base.ts";

export interface AnimeRole {
	role: string;
	anime: Ressource;
}

export interface MangaRole {
	role: string;
	manga: Ressource;
}

export interface CharacterMinimal {
	mal_id: number;
	url: string;
	images: CommonImage;
	name: string;
}

export interface Character extends CharacterMinimal {
	name_kanji?: string;
	nicknames: string[];
	favorites: number;
	about?: string;
}

export interface CharacterFull extends Character {
	anime: AnimeRole[];
	manga: MangaRole[];
	voices: VoiceActors[];
}