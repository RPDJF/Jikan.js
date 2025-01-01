import { baseModel } from "../index.ts";

export interface MangaImages {
  jpg: {
    image_url?: string;
    small_image_url?: string;
    large_image_url?: string;
  };
  webp: {
    image_url?: string;
    small_image_url?: string;
    large_image_url?: string;
  };
}

export enum MangaType {
  Manga = "Manga",
  Novel = "Novel",
  LightNovel = "Light Novel",
  OneShot = "One-shot",
  Doujinshi = "Doujinshi",
  Manhua = "Manhua",
  Manhwa = "Manhwa",
  OEL = "OEL",
}

export enum MangaStatus {
  Finished = "Finished",
  Publishing = "Publishing",
  OnHiatus = "On Hiatus",
  Discontinued = "Discontinued",
  NotYetPublished = "Not yet published",
}

export interface Manga extends baseModel.GenericModel {
  images: MangaImages;
  approved: boolean;
  titles: baseModel.Titles[];
  type?: MangaType;
  chapters?: number;
  volumes?: number;
  status: MangaStatus;
  publishing: boolean;
  published: baseModel.DateRange;
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
  members?: number;
  favorites?: number;
  synopsis?: string;
  background?: string;
  authors: baseModel.MalEntries[];
  serializations: baseModel.MalEntries[];
  genres: baseModel.MalEntries[];
  explicit_genres: baseModel.MalEntries[];
  themes: baseModel.MalEntries[];
  demographics: baseModel.MalEntries[];
}
