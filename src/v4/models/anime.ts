import { MalEntries, VoiceActors, CommonImage, ImageFull } from "./base.ts";
import { CharacterMinimal } from "./character.ts";
import { UserMeta } from "./user.ts";

export interface AnimeImages {
	jpg?: {
		image_url?: string;
		small_image_url?: string;
		large_image_url?: string;
	};
	webp?: {
		image_url?: string;
		small_image_url?: string;
		large_image_url?: string;
	};
}

export interface AnimeMeta {
	mal_id: number;
	url: string;
	images: AnimeImages;
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

export enum Season {
    Summer = "summer",
    Winter = "winter",
    Spring = "spring",
    Fall = "fall"
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

export enum ForumFilter {
	All = "all",
	Episode = "episode",
	Other = "other"
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

export interface AnimeUserUpdate {
	user: UserMeta;
	score?: number;
	status: string;
	episodes_seen?: number;
	episodes_total?: number;
	date: string;
}

export interface AnimeReview {
	user: UserMeta;
	mal_id: number;
	url: string;
	type: string;
	reactions: {
		overall: number;
		nice: number;
		love_it: number;
		funny: number;
		confusing: number;
		informative: number;
		well_written: number;
		creative: number;
	};
	date: string;
	review: string;
	score: number;
	tags: string[];
	is_spoiler: boolean;
	is_preliminary: boolean;
	episodes_watched: number;
}

export interface Anime {
	mal_id: number;
	url: string;
	Images: AnimeImages;
    trailer: TrailerBase;
    approved: boolean;
    titles: {
		type: string;
		title: string;
	}[];
    type?: Type;
    source?: string;
    episodes?: number;
    status?: string;
    airing: boolean;
    aired: {
		from?: string;
		to?: string;
	};
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
    broadcast: {
		day?: string;
		time?: string;
		timezone?: string;
		string?: string;
	};
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