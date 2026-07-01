import { useState } from "react";
import type { ISearchRes } from "../interfaces/responses/ISearchRes";
import SearchDisplay from "../components/base/SearchDisplay";
import SearchField from "../components/base/SearchField";
import { observer } from "mobx-react-lite";
import { Navigate, useNavigate } from "react-router-dom";
import BrowseCacheStore from "../stores/BrowseCacheStore";

export default observer(function SearchPage() {
    const navigate = useNavigate();
    const [searchField, setSearchField] = useState(BrowseCacheStore.getLastSearchQuery() || "");
    const [result, setResult] = useState<ISearchRes | null>(null);
    const [loading, setLoading] = useState(false);

    if (BrowseCacheStore.getGoToBrowsePage())
        return <Navigate to="/browse" replace={true} />;

    return (
        <div className="flex flex-col w-full max-w-[95vw] sm:max-w-200 mx-auto mt-30 px-2">
            <SearchField searchField={searchField} setSearchField={setSearchField} setResult={setResult} setLoading={setLoading} />
            <ul className="flex flex-col gap-y-2">
                {result && result.data.length > 0 ? (
                    <>
                        <span className="text-xs">Top matches:</span>
                        <SearchDisplay data={result.data.slice(0, 3)} orientation="horizontal" />
                        <li className="w-full self-center mt-5 flex justify-center">
                            <button className="input-bg-color border-secondary-color border px-2 py-1 rounded-md mx-auto" onClick={() => { BrowseCacheStore.setGoToBrowsePage(true); navigate("/browse"); }}>View all <strong>{result.pagination?.items.total}</strong></button>
                        </li>
                    </>
                ) : (
                    loading && <li>Loading...</li>
                )}
            </ul>
        </div>
    );
});