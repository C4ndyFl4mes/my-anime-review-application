export interface IPagination {
    lastVisiblePage: number;
    hasNextPage: boolean;
    currentPage: number;
    items: IItems;
}

export interface IItems {
    count: number;
    total: number;
    perPage: number;
}