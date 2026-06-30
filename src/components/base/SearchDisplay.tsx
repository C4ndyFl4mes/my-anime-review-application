import type { ISearchRes } from "../../interfaces/responses/ISearchRes";

// This component is responsible for displaying top three search matches from a search query.
export default function SearchDisplay({ searchResults }: { searchResults: ISearchRes | null }) {
    if (!searchResults) {
        return <p className="text-2xl">No results found</p>;
    }

    const topThreeResults = searchResults.data.slice(0, 3);

    return (
        <ul className="flex flex-col gap-y-2">
            {topThreeResults.map((result) => (
                <li key={result.malId} className="text-wrap border-secondary-color border tertiary-bg-color rounded-xl flex flex-col overflow-hidden">
                    <div className="flex">
                        <div className="relative w-fit">
                            {result.imageUrl && <img src={result.imageUrl} width={90} height={128} alt={"Banner for " + result.title} className="rounded-tl-xl" />}
                            {result.currentUserWatchStatus && (
                                <span className="absolute top-0 right-0 p-0.5 text-xxs over-image-text-bg rounded-bl-md">{result.currentUserWatchStatus}</span>
                            )}
                            <span className="absolute bottom-0 right-0 p-0.5 px-1.5 text-xxs over-image-text-bg rounded-tl-md font-bold">
                                ★ {result.score ? result.score : "?"}
                            </span>
                        </div>
                        <div className="flex flex-col justify-between ms-1">
                            <h2 className="text-sm">{result.title}</h2>
                            <span className="text-xxs mb-0.5">{result.type} - {result.ageRating}</span>
                        </div>
                    </div>
                    <ul className="flex flex-wrap text-xxs secondary-bg-color w-fit">
                        {result.genres?.map((genre) => (
                            <li key={genre.mal_id}>
                                <a href={genre.url} target="_blank" rel="noopener noreferrer" className="text-nowrap px-2 py-1">{genre.name}</a>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
            <li className="w-fit self-center mt-5">
                <button className="input-bg-color border-secondary-color border px-2 py-1 rounded-md mx-auto">View all <strong>{searchResults.pagination.items.total}</strong></button>
            </li>
        </ul>
    );
}