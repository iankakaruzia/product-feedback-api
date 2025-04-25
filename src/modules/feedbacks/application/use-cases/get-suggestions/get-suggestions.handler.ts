import { FeedbacksRepository } from '@modules/feedbacks/domain/abstractions/feedbacks.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PaginatedFeedbackResponseDto } from '../../dtos/paginated-feedback-response.dto';
import { GetSuggestionsQuery } from './get-suggestions.query';

@QueryHandler(GetSuggestionsQuery)
export class GetSuggestionsHandler
  implements IQueryHandler<GetSuggestionsQuery>
{
  constructor(private readonly feedbacksRepository: FeedbacksRepository) {}

  async execute(
    query: GetSuggestionsQuery,
  ): Promise<PaginatedFeedbackResponseDto> {
    const feedbacks = await this.feedbacksRepository.findPaginated({
      cursor: query.cursor ?? null,
      limit: query.limit,
      productId: query.productId,
      search: query.search,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });

    return PaginatedFeedbackResponseDto.fromPaginatedResult(feedbacks);
  }
}
