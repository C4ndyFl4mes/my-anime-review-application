import type { IMalObject } from "./IMalObject";

export interface IAnimeMetaData {
    aired: string | null;
    genres: Array<IMalObject> | null;
    studios: Array<IMalObject> | null;
    producers: Array<IMalObject> | null;
    licensors: Array<IMalObject> | null;
    themes: Array<IMalObject> | null;
    demographics: Array<IMalObject> | null;
}