export interface PaginationState {
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}