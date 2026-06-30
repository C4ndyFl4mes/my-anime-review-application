import type { IAnimeMetaData } from "../partials/IAnimeMetaData";
import type { IReview } from "../requests/IReview";

export interface IAnime {
    malId: number;
    title: string | null;
    synopsis: string | null;
    imageUrl: string | null;
    trailerUrl: string | null;
    malUrl: string | null;
    totalEpisodes: number | null;
    ageRating: string | null;
    airingStatus: string | null;
    type: string | null;
    season: string | null;
    year: number | null;
    source: string | null;
    metaData: IAnimeMetaData | null;
    lastSynced: string | null;
    topReviews: Array<IReview>;
    currentUserReview: IReview | null;
    canCurrentUserMakeReview: boolean;
}