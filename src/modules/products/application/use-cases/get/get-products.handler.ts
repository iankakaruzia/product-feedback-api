import { PaginatedResult } from '@common/domain/interfaces/pagination.interface';
import { ProductsRepository } from '@modules/products/domain/abstractions/products.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ProductResponseDto } from '../../dtos/product-response.dto';
import { GetProductsQuery } from './get-products.query';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(
    query: GetProductsQuery,
  ): Promise<PaginatedResult<ProductResponseDto>> {
    const products = await this.productsRepository.findPaginated({
      limit: query.limit,
      offset: query.offset,
      ownerId: query.ownerId,
      search: query.search,
      sortOrder: query.sortOrder,
    });

    return {
      currentPage: products.currentPage,
      hasNextPage: products.hasNextPage,
      hasPreviousPage: products.hasPreviousPage,
      items: products.items.map((item) => ProductResponseDto.fromEntity(item)),
      pageSize: products.pageSize,
      total: products.total,
      totalPages: products.totalPages,
    };
  }
}
