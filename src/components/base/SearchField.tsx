import { useCallback, useEffect, useMemo, useRef } from "react";
import type { ISearchRes } from "../../interfaces/responses/ISearchRes";
import BrowseCacheStore from "../../stores/BrowseCacheStore";
import GlobalMessageStore from "../../stores/GlobalMessageStore";
import type { IError } from "../../interfaces/responses/IError";
import BrowseService from "../../services/BrowseService";
import search_icon from "../../assets/icons/search.svg";
import { useNavigate } from "react-router-dom";

export default function SearchField({ searchField, setSearchField, setResult, setLoading }: { searchField: string, setSearchField: (value: string) => void, setResult: (value: ISearchRes | null) => void, setLoading: (value: boolean) => void }) {
    const navigate = useNavigate();
    const page = 1; // Search page will always be the first page. The browse page shows more results.
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const search = useCallback(async (query: string, page: number) => {
        setLoading(true);

        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
            setResult(null);
            setLoading(false);
            return;
        }

        const cacheKey = `${trimmedQuery}-${page}`;
        const cachedResult = BrowseCacheStore.getCache(cacheKey);

        if (cachedResult) {
            setResult(cachedResult);
            BrowseCacheStore.setLastSearchQuery(trimmedQuery);
            BrowseCacheStore.setLastSearchPage(page);
            setLoading(false);
            return;
        }

        const res: ISearchRes | IError = await BrowseService.Search(trimmedQuery, page);
        if ((res as IError).statusCode) {
            setResult(BrowseCacheStore.getCache(`${trimmedQuery}-${page - 1}`) || null);
            GlobalMessageStore.setMessage((res as IError).message, (res as IError).statusCode);
        } else {
            setResult(res as ISearchRes);
            if ((res as ISearchRes).data.length > 0) {
                BrowseCacheStore.setCache(cacheKey, res as ISearchRes);
                BrowseCacheStore.setLastSearchQuery(trimmedQuery);
                BrowseCacheStore.setLastSearchPage(page);
            }
        }
        setLoading(false);
    }, [page]);


    // Debounce the search function to avoid making too many requests while typing
    const debounce = <T,>(func: (value: T) => void, delay: number) => {
        return (value: T) => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
            debounceTimeout.current = setTimeout(() => {
                func(value);
            }, delay);
        }
    };

    const debouncedSearch = useMemo(
        () => debounce((value: string) => { void search(value, page); }, 1000),
        [search, page]
    );

    // Clear the debounce timeout when the component unmounts
    useEffect(() => {
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [])

    // Load the last search query and page from the cache when the component mounts
    useEffect(() => {
        const lastQuery = BrowseCacheStore.getLastSearchQuery();
        const lastPage = BrowseCacheStore.getLastSearchPage();
        if (lastQuery) {
            setSearchField(lastQuery);
            if (lastPage) {
                void search(lastQuery, lastPage);
            }
        }
    }, []);

    return (
        <>
            <div className="relative w-full max-w-[95vw] ">
                <input type="text" id="search-field" name="search" value={searchField} placeholder="Search anime..." onChange={(e) => { const value = e.target.value; setSearchField(value); debouncedSearch(value); }} onKeyDown={(e) => { if (e.key === "Enter") { BrowseCacheStore.setGoToBrowsePage(true); navigate("/browse"); } }} className="search-bar border border-secondary-color input-bg-color rounded-md w-full h-10 ps-2 pr-11" />
                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 flex cursor-pointer" onClick={() => { BrowseCacheStore.setGoToBrowsePage(true); navigate("/browse"); }}>
                    <img src={search_icon} alt="Search" width={32} height={32} />
                </button>
            </div>
            <label htmlFor="search-field" className="text-xxs font-bold self-end">Powered by JikanAPI</label>
        </>
    )
}