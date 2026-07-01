import { useState } from "react";
import SearchField from "../components/base/SearchField";
import BrowseCacheStore from "../stores/BrowseCacheStore";
import type { ISearchRes } from "../interfaces/responses/ISearchRes";
import SearchDisplay from "../components/base/SearchDisplay";
import PaginationController from "../components/base/PaginationController";
import type { IError } from "../interfaces/responses/IError";
import BrowseService from "../services/BrowseService";
import GlobalMessageStore from "../stores/GlobalMessageStore";

export default function BrowsePage() {
    const [searchField, setSearchField] = useState(BrowseCacheStore.getLastSearchQuery() || "");
    const [result, setResult] = useState<ISearchRes | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchPage = async (page: number) => {
        const query = searchField.trim() || BrowseCacheStore.getLastSearchQuery() || "";
        if (!query) return;

        const cacheKey = `${query}-${page}`;
        const cachedResult = BrowseCacheStore.getCache(cacheKey);
        if (cachedResult) {
            setResult(cachedResult);
            BrowseCacheStore.setLastSearchPage(page);
            setLoading(false);
            return;
        }

        const res: ISearchRes | IError = await BrowseService.Search(query, page);
        if ((res as IError).statusCode) {
            setResult(BrowseCacheStore.getCache(`${query}-${page - 1}`) || null);
            GlobalMessageStore.setMessage((res as IError).message, (res as IError).statusCode);
        } else {
            const ok = res as ISearchRes;
            setResult(ok);
            BrowseCacheStore.setCache(cacheKey, ok);
            BrowseCacheStore.setLastSearchQuery(query);
            BrowseCacheStore.setLastSearchPage(page);
        }

        setLoading(false);
    }

    return (
        <div className="flex flex-col w-full max-w-[95vw] mx-auto px-2">
            <div className="flex flex-col w-full max-w-200 mx-auto">
                <SearchField searchField={searchField} setSearchField={setSearchField} setResult={setResult} setLoading={setLoading} />
            </div>
            {result && result.pagination && result.pagination.items.total > 1 && (
                <PaginationController pagination={result?.pagination || null} onPageChange={(page) => { fetchPage(page); }} />
            )}
            <ul className="browse-grid mt-5 mx-auto w-full max-w-[95vw]">
                {result && result.data.length > 0 ? (
                    <SearchDisplay data={result.data} orientation="vertical" />
                ) : (
                    loading && <p>Loading...</p>
                )}
            </ul>
        </div>
    );
}