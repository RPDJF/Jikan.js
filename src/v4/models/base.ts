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

export interface MalEntries extends GenericModel {
    type: string;
    name: string;
}

export interface BaseModel extends GenericModel {
	images: Image;
}

export interface Ressource extends BaseModel {
	title: string;
}

export interface Person extends BaseModel {
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