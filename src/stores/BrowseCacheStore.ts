import { makeAutoObservable } from "mobx";
import type { ISearchRes } from "../interfaces/responses/ISearchRes";

// A simple in-memory cache to store browse data.
class BrowseCacheStore {
    private cache: Map<string, ISearchRes> = new Map(); // Key: query + page number, Value: data
    private cacheLimit: number = 50; // Limit the cache to 50 entries
    private lastInspectedAnimeId: number | null = sessionStorage.getItem("lastInspectedAnimeId") ? parseInt(sessionStorage.getItem("lastInspectedAnimeId") as string) : null;
    private lastSearchQuery: string | null = sessionStorage.getItem("lastSearchQuery");
    private lastSearchPage: number | null = sessionStorage.getItem("lastSearchPage") ? parseInt(sessionStorage.getItem("lastSearchPage") as string) : null;
    private goToBrowsePage: boolean = sessionStorage.getItem("goToBrowsePage") === "true";

    constructor() {
        makeAutoObservable(this);
    }

    public getCache(key: string): ISearchRes | undefined {
        return this.cache.get(key);
    }

    public setCache(key: string, value: ISearchRes): void {
        if (this.cache.size >= this.cacheLimit) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey) this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }

    public getLastInspectedAnimeId(): number | null {
        return this.lastInspectedAnimeId;
    }

    public setLastInspectedAnimeId(id: number | null): void {
        this.lastInspectedAnimeId = id;
        sessionStorage.setItem("lastInspectedAnimeId", id !== null ? id.toString() : "");
    }

    public getLastSearchQuery(): string | null {
        return this.lastSearchQuery;
    }

    public setLastSearchQuery(query: string | null): void {
        this.lastSearchQuery = query;
        sessionStorage.setItem("lastSearchQuery", query ?? "");
    }

    public getLastSearchPage(): number | null {
        return this.lastSearchPage;
    }

    public setLastSearchPage(page: number | null): void {
        this.lastSearchPage = page;
        sessionStorage.setItem("lastSearchPage", page !== null ? page.toString() : "");
    }

    public getGoToBrowsePage(): boolean {
        return this.goToBrowsePage;
    }

    public setGoToBrowsePage(value: boolean): void {
        this.goToBrowsePage = value;
        sessionStorage.setItem("goToBrowsePage", String(value));
    }
}

export default new BrowseCacheStore();