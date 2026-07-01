import type { IPagination } from "../../interfaces/partials/IPagination";
import chevronLeft from "../../assets/icons/chevron-left.svg";
import chevronRight from "../../assets/icons/chevron-right.svg";

export default function PaginationController({ pagination, onPageChange }: { pagination: IPagination | null, onPageChange: (page: number) => void }) {
    if (!pagination || pagination.items.total <= 25) {
        return null; // No need to render pagination if there's only one page or no pagination data
    }

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= Math.ceil(pagination.items.total / pagination.items.per_page)) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center mt-5 tertiary-bg-color w-fit mx-auto rounded-lg overflow-hidden">
            <button
                className="w-15 max-w-[15vw] secondary-bg-color cursor-pointer flex items-center justify-center"
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}>
                <img src={chevronLeft} alt="Previous" className="w-10 h-10" />
            </button>
            <div className="flex flex-col items-center justify-center px-3 py-1">
                <span className="px-3 py-1 mx-1">{pagination.current_page} / {Math.ceil(pagination.items.total / pagination.items.per_page)}</span>
                <span className="text-xxs">Total items: {pagination.items.total}</span>
            </div>
            <button
                className="w-15 max-w-[15vw] secondary-bg-color cursor-pointer flex items-center justify-center"
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === Math.ceil(pagination.items.total / pagination.items.per_page)}>
                <img src={chevronRight} alt="Next" className="w-10 h-10" />
            </button>
        </div>
    );
}