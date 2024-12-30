import { MalEntries, VoiceActors, CommonImage, ImageFull } from "./base.ts";
import { CharacterMinimal } from "./character.ts";

export interface Title {
    type: string;
    title: string;
}

export interface TrailerBase {
	youtube_id?: string;
	url?: string;
	embed_url?: string;
}

export interface Trailer extends TrailerBase {
	images?: ImageFull;
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

export interface AnimeEpisode {
	mal_id: number;
	url: string;
	title: string;
	title_japanese?: string;
	title_romanji?: string;
	aired?: string;
	score?: number;
	filler: boolean;
	recap: boolean;
	forum_url?: string;
}

export interface AnimeEpisodeFull {
	mal_id: number;
	url: string;
	title: string;
	title_japanese?: string;
	title_romanji?: string;
	duration?: number;
	aired?: string;
	filler: boolean;
	recap: boolean;
	synopsis?: string;
}

export interface AnimeNews {
	mal_id: number;
	url: string;
	title: string;
	date: string;
	author_username: string;
	author_url: string;
	form_url: string;
	images: CommonImage;
	comments: number;
	excerpt: string;
}

export interface LastComment {
	url: string;
	author_username: string;
	author_url: string;
	date?: string;
}

export interface AnimeForum {
	mal_id: number;
	url: string;
	title: string;
	date: string;
	author_username: string;
	author_url: string;
	comments: number;
	last_comment: LastComment;
}

export interface MusicVideo {
	title: string;
	video: Trailer;
	meta: {
		title?: string;
		author?: string;
	}
}

export interface AnimePromo {
	title: string;
	trailer: Trailer;
}

export interface VideoEpisode {
	mal_id: number;
	url: string;
	title: string;
	episode: string;
	images: CommonImage;
}

export interface AnimeVideo {
	promo: AnimePromo[];
	episodes: VideoEpisode[];
	music_videos: MusicVideo[];
}

export interface AnimeStatistics {
	watching: number;
	completed: number;
	on_hold: number;
	dropped: number;
	plan_to_watch: number;
	total: number;
	scores: {
		score: number;
		votes: number;
		percentage: number;
	}[];
}

export interface AnimeMoreInfo {
	moreinfo?: string;
}

export interface Anime {
	mal_id: number;
	url: string;
	Images: CommonImage;
    trailer: TrailerBase;
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