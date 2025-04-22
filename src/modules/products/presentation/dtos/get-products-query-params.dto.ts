import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class GetProductsQueryParamsDto {
  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;

  @IsNotEmpty()
  @IsOptional()
  search?: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}
