import {
  PaginatedQuery,
  PaginatedSortOrder,
} from '@common/domain/interfaces/pagination.interface';
import { FeedbackSortBy } from '@modules/feedbacks/domain/abstractions/feedbacks.repository';

export class GetSuggestionsQuery implements PaginatedQuery {
  constructor(
    public productId: string,
    public limit?: number,
    public cursor?: null | string,
    public search?: string,
    public sortBy?: FeedbackSortBy,
    public sortOrder?: PaginatedSortOrder,
  ) {}
}
