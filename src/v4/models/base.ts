export interface Image {
	jpg?: {
		image_url?: string;
		small_image_url?: string;
	},
	webp?: {
		image_url?: string;
		small_image_url?: string;
	}
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
	images: Image;
	title: string;
}

export interface Person {
	mal_id: number;
	url: string;
	images: Image;
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