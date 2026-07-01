import type { IAnimeSearchItem } from "../../interfaces/partials/IAnimeSearchItem";
import SearchItem from "./SearchItem";

// This component is responsible for displaying top three search matches from a search query.
export default function SearchDisplay({ data, orientation }: { data: Array<IAnimeSearchItem> | null, orientation: "horizontal" | "vertical" }) {
    if (!data) {
        return <li className="text-2xl">No results found</li>;
    }

    return data.map((result) => (
        <SearchItem key={result.malId} item={result} orientation={orientation} />
    ));
}