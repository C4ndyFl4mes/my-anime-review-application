import { useState } from "react";
import type { ISearchRes } from "../interfaces/responses/ISearchRes";
import SearchDisplay from "../components/base/SearchDisplay";
import SearchField from "../components/base/SearchField";

export default function SearchPage() {
    const [searchField, setSearchField] = useState("");
    const [result, setResult] = useState<ISearchRes | null>(null);
    const [loading, setLoading] = useState(false);
   
    return (
        <div className="flex flex-col w-[95vw] md:w-150 max-w-150 mx-auto mt-30">
            <SearchField searchField={searchField} setSearchField={setSearchField} setResult={setResult} setLoading={setLoading} />
            {result && result.data.length > 0 ? (
                <>
                    <span className="text-xs">Top matches:</span>
                    <SearchDisplay searchResults={result} />
                </>
            ) : (
                loading && <p>Loading...</p>
            )}
        </div>
    );
}