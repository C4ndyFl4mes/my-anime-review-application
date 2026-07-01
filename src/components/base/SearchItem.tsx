import type { IAnimeSearchItem } from "../../interfaces/partials/IAnimeSearchItem";

export default function SearchItem({ item, orientation }: { item: IAnimeSearchItem, orientation: "horizontal" | "vertical" }) {
    if (orientation === "horizontal") {
        return <HorizontalSearchItem item={item} />;
    } else if (orientation === "vertical") {
        return <VerticalSearchItem item={item} />;
    }
}

function HorizontalSearchItem({ item }: { item: IAnimeSearchItem }) {
    return (
        <li key={item.malId} className="w-full min-w-0 text-wrap border-secondary-color border tertiary-bg-color rounded-xl flex flex-col overflow-hidden">
            <div className="flex min-w-0">
                <div className="relative w-fit">
                    {item.imageUrl && <img src={item.imageUrl} width={90} height={128} alt={"Banner for " + item.title} className="rounded-tl-xl" />}
                    {item.currentUserWatchStatus && (
                        <span className="absolute top-0 right-0 p-0.5 text-xxs over-image-text-bg rounded-bl-md">{item.currentUserWatchStatus}</span>
                    )}
                    <span className="absolute bottom-0 right-0 p-0.5 px-1.5 text-xxs over-image-text-bg rounded-tl-md font-bold">
                        ★ {item.score ? item.score : "?"}
                    </span>
                </div>
                <div className="flex flex-col justify-between ms-1 min-w-0">
                    <h2 className="text-sm wrap-break-word">{item.title}</h2>
                    <span className="text-xxs mb-0.5">{item.type} - {item.ageRating}</span>
                </div>
            </div>
            <ul className="flex flex-wrap text-xxs py-1 secondary-bg-color w-full">
                {item.genres?.map((genre) => (
                    <li key={genre.mal_id}>
                        <a href={genre.url} target="_blank" rel="noopener noreferrer" className="px-2 wrap-break-word">{genre.name}</a>
                    </li>
                ))}
            </ul>
        </li>
    );
}

function VerticalSearchItem({ item }: { item: IAnimeSearchItem }) {
    return (
        <li className="flex flex-col w-full min-w-0 text-wrap border-secondary-color border tertiary-bg-color rounded-xl overflow-hidden">
            <div className="relative">
                {item.imageUrl && <img src={item.imageUrl} width={225} height={320} alt={"Banner for " + item.title} className="rounded-t-xl w-full" />}
                {item.currentUserWatchStatus && (
                    <span className="absolute top-0 right-0 p-0.5 text-xxs over-image-text-bg rounded-bl-md">{item.currentUserWatchStatus}</span>
                )}
                <span className="absolute bottom-0 right-0 p-0.5 px-1.5 text-xxs over-image-text-bg rounded-tl-md font-bold">
                    ★ {item.score ? item.score : "?"}
                </span>
            </div>
            <h2 className="text-sm px-2 pt-1 wrap-break-word">{item.title}</h2>
            <span className="text-xxs mb-0.5 px-2">{item.type} - {item.ageRating}</span>
            <ul className="flex flex-wrap justify-center text-xs secondary-bg-color w-full mt-auto">
                {item.genres?.map((genre) => (
                    <li key={genre.mal_id}>
                        <a href={genre.url} target="_blank" rel="noopener noreferrer" className="px-1 wrap-break-word">{genre.name}</a>
                    </li>
                ))}
            </ul>
        </li>
    )
}