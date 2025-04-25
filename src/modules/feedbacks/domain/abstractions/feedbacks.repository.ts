import {
  CursorPaginatedQuery,
  CursorPaginatedResult,
} from '@common/domain/interfaces/pagination.interface';

import { Feedback } from '../entities/feedback.entity';

export type FeedbackArgs = {
  id: string;
  ownerId: string;
};

export type FeedbackFindArgs = CursorPaginatedQuery<FeedbackSortBy> & {
  productId: string;
};

export type FeedbackSortBy = 'comments' | 'upvotes';

export abstract class FeedbacksRepository {
  abstract create(feedback: Feedback): Promise<void>;
  abstract delete(feedback: Feedback): Promise<void>;
  abstract findById(args: FeedbackArgs): Promise<Feedback | null>;
  abstract findPaginated(
    args: FeedbackFindArgs,
  ): Promise<CursorPaginatedResult<Feedback>>;
  abstract update(feedback: Feedback): Promise<void>;
}
