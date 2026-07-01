export interface IPagination {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: IItems;
}

export interface IItems {
    count: number;
    total: number;
    per_page: number;
}