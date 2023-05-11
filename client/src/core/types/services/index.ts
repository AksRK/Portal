export interface DeleteImageParams {
	id?: string;
	folderPath?: string;
}

export interface PaginationParams<T> {
	docs: T[];
	totalDocs: number;
	limit: number;
	totalPages: number;
	page: number;
	pagingCounter: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: null | number;
	nextPage: null | number;
}