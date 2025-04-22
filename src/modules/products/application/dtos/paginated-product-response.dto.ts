import { PaginatedResult } from '@common/domain/interfaces/pagination.interface';
import { Product } from '@modules/products/domain/entities/product.entity';

import { ProductResponseDto } from './product-response.dto';

export class PaginatedProductResponseDto {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: ProductResponseDto[];
  pageSize: number;
  total: number;
  totalPages: number;

  public static fromPaginatedResult(
    result: PaginatedResult<Product>,
  ): PaginatedProductResponseDto {
    return {
      currentPage: result.currentPage,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
      items: result.items.map((item) => ProductResponseDto.fromEntity(item)),
      pageSize: result.pageSize,
      total: result.total,
      totalPages: result.totalPages,
    };
  }
}
