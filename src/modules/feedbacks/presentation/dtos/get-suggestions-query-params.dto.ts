import { FeedbackSortBy } from '@modules/feedbacks/domain/abstractions/feedbacks.repository';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class GetSuggestionsQueryParamsDto {
  @IsOptional()
  cursor?: string;

  @IsOptional()
  limit?: number;

  @IsNotEmpty()
  @IsOptional()
  search?: string;

  @IsIn(['comments', 'upvotes'])
  @IsOptional()
  sortBy?: FeedbackSortBy;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}
