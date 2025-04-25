import {
  Metadata,
  PaginatedResult,
} from '@common/domain/interfaces/pagination.interface';
import { Product } from '@modules/products/domain/entities/product.entity';

import { ProductResponseDto } from './product-response.dto';

export class PaginatedProductResponseDto {
  items: ProductResponseDto[];
  metadata: Metadata;

  public static fromPaginatedResult(
    result: PaginatedResult<Product>,
  ): PaginatedProductResponseDto {
    const response = new PaginatedProductResponseDto();
    response.items = result.items.map((item) =>
      ProductResponseDto.fromEntity(item),
    );
    response.metadata = {
      currentPage: result.metadata.currentPage,
      hasNextPage: result.metadata.hasNextPage,
      hasPreviousPage: result.metadata.hasPreviousPage,
      pageSize: result.metadata.pageSize,
      total: result.metadata.total,
      totalPages: result.metadata.totalPages,
    };

    return response;
  }
}
