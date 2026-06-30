import type { IAnimeSearchItem } from "../partials/IAnimeSearchItem";
import type { IPagination } from "../partials/IPagination";

export interface ISearchRes {
    data: Array<IAnimeSearchItem>;
    pagination: IPagination;
}