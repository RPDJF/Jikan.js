export interface CommonImage {
	jpg?: {
		image_url?: string;
		small_image_url?: string;
	},
	webp?: {
		image_url?: string;
		small_image_url?: string;
	}
}

export interface ImageFull {
	image_url?: string;
	small_image_url?: string;
	medium_image_url?: string;
	large_image_url?: string;
	maximum_image_url?: string;
}

export interface GenericModel {
	mal_id: number;
	url: string;
}

export interface MalEntries {
	mal_id: number;
	url: string;
    type: string;
    name: string;
}

export interface Ressource {
	mal_id: number;
	url: string;
	images: CommonImage;
	title: string;
}

export interface Person {
	mal_id: number;
	url: string;
	images: CommonImage;
	name: string;
}

export interface VoiceActors {
	language: string;
	person: Person;
}

export interface Staff {
	person: Person;
	positions: string[];
}

export interface Pagination {
	last_visible_page: number;
	has_next_page: boolean;
}