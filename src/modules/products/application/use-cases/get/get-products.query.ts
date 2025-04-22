import {
  PaginatedQuery,
  PaginatedSortOrder,
} from '@common/domain/interfaces/pagination.interface';

export class GetProductsQuery implements PaginatedQuery {
  constructor(
    public ownerId: string,
    public limit?: number,
    public offset?: number,
    public search?: string,
    public sortOrder?: PaginatedSortOrder,
  ) {}
}
