import { BaseModel, Person, Ressource } from "./base.ts";

export interface AnimeRole {
	role: string;
	anime: Ressource;
}

export interface MangaRole {
	role: string;
	manga: Ressource;
}

export interface Voice {
	language: string;
	person: Person;
}

export interface Character extends BaseModel {
	name: string;
	name_kanji?: string;
	nicknames: string[];
	favorites: number;
	about?: string;
}

export interface CharacterFull extends Character {
	anime: AnimeRole[];
	manga: MangaRole[];
	voices: Voice[];
}