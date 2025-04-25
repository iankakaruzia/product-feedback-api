import {
  CursorMetadata,
  CursorPaginatedResult,
} from '@common/domain/interfaces/pagination.interface';
import { Feedback } from '@modules/feedbacks/domain/entities/feedback.entity';

import { FeedbackResponseDto } from './feedback-response.dto';

export class PaginatedFeedbackResponseDto {
  items: FeedbackResponseDto[];
  metadata: CursorMetadata;

  public static fromPaginatedResult(
    result: CursorPaginatedResult<Feedback>,
  ): PaginatedFeedbackResponseDto {
    const response = new PaginatedFeedbackResponseDto();
    response.items = result.items.map((item) =>
      FeedbackResponseDto.fromEntity(item),
    );
    response.metadata = {
      hasNextPage: result.metadata.hasNextPage,
      limit: result.metadata.limit,
      nextCursor: result.metadata.nextCursor,
      total: result.metadata.total,
    };

    return response;
  }
}
