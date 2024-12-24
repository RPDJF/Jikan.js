import { BaseModel, MalEntries, VoiceActors } from "./base.ts";
import { CharacterMinimal } from "./character.ts";

export interface Title {
    type: string;
    title: string;
}

export interface Trailer {
    youtube_id: string;
    url: string;
    embed_url: string;
}

export enum Type {
    TV = "TV",
    OVA = "OVA",
    Movie = "Movie",
    Special = "Special",
    ONA = "ONA",
    Music = "Music"
}

export interface daterange {
    from: string | null;
    to: string | null;
}

export enum Season {
    Summer = "summer",
    Winter = "winter",
    Spring = "spring",
    Fall = "fall"
}

export interface Broadcast {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
}

export interface Relation {
    relation: string;
    entry: MalEntries[];
}

export interface Theme {
    openings: string[];
    endings: string[];
}

export interface External {
    name: string;
    url: string;
}

export enum Rating {
    G = "G - All Ages",
    PG = "PG - Children",
    PG13 = "PG-13 - Teens 13 or older",
    R17 = "R - 17+ (violence & profanity)",
    R = "R+ - Mild Nudity",
    RX = "Rx - Hentai"
}

export interface CharacterRole {
	character: CharacterMinimal;
	role: string;
	voice_actors: VoiceActors[];
}

export interface Anime extends BaseModel {
    trailer: Trailer;
    approved: boolean;
    titles: Title[];
    type?: Type;
    source?: string;
    episodes?: number;
    status?: string;
    airing: boolean;
    aired: daterange;
    duration?: string;
    rating?: Rating;
    score?: number;
    scored_by?: number;
    rank?: number;
    popularity?: number;
    members?: number;
    favorites?: number;
    synopsis: string;
    background?: string;
    season?: Season;
    year?: number;
    broadcast: Broadcast;
    producers: MalEntries[];
    licensors: MalEntries[];
    studios: MalEntries[];
    genres: MalEntries[];
    explicit_genres: MalEntries[];
    themes: MalEntries[];
    demographics: MalEntries[];
}

export interface AnimeFull extends Anime {
    relations: Relation[];
    theme: Theme;
    external: External[];
    streaming: External[];
}