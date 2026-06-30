import type { IMalObject } from "./IMalObject";

export interface IAnimeSearchItem {
    malId: number;
    title: string | null;
    imageUrl: string | null;
    ageRating: string | null;
    type: string | null;
    currentUserWatchStatus: string | null;
    score: number | null;
    genres: Array<IMalObject> | null;
}