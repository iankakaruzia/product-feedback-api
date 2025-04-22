export interface PaginatedQuery {
  limit?: number;
  offset?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: PaginatedSortOrder;
}

export interface PaginatedResult<T> {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: T[];
  pageSize: number;
  total: number;
  totalPages: number;
}

export type PaginatedSortOrder = 'asc' | 'desc';
