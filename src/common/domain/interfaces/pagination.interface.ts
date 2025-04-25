export interface CursorMetadata {
  hasNextPage: boolean;
  limit: number;
  nextCursor: null | string;
  total: number;
}

export interface CursorPaginatedQuery<TSortBy = string>
  extends BasePaginatedQuery<TSortBy> {
  cursor: null | string;
}

export interface CursorPaginatedResult<T> {
  items: T[];
  metadata: CursorMetadata;
}

export interface Metadata {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedQuery extends BasePaginatedQuery {
  offset?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  metadata: Metadata;
}

export type PaginatedSortOrder = 'asc' | 'desc';

interface BasePaginatedQuery<TSortBy = string> {
  limit?: number;
  search?: string;
  sortBy?: TSortBy;
  sortOrder?: PaginatedSortOrder;
}
