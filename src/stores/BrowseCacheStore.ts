import { makeAutoObservable } from "mobx";
import type { ISearchRes } from "../interfaces/responses/ISearchRes";

// A simple in-memory cache to store browse data.
class BrowseCacheStore {
    private cache: Map<string, ISearchRes> = new Map(); // Key: query + page number, Value: data
    private cacheLimit: number = 50; // Limit the cache to 50 entries
    private lastInspectedAnimeId: number | null = null;
    private lastSearchQuery: string | null = null;

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
    }

    public getLastSearchQuery(): string | null {
        return this.lastSearchQuery;
    }

    public setLastSearchQuery(query: string | null): void {
        this.lastSearchQuery = query;
    }
}

export default new BrowseCacheStore();