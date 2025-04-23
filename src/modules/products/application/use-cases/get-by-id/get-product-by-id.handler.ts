import { ProductsRepository } from '@modules/products/domain/abstractions/products.repository';
import { ProductNotFoundError } from '@modules/products/domain/errors/product-not-found.error';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ProductResponseDto } from '../../dtos/product-response.dto';
import { GetProductByIdQuery } from './get-product-by-id.query';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler
  implements IQueryHandler<GetProductByIdQuery>
{
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(query: GetProductByIdQuery): Promise<ProductResponseDto> {
    const product = await this.productsRepository.findById({
      id: query.productId,
      ownerId: query.ownerId,
    });

    if (!product) {
      throw new ProductNotFoundError();
    }

    return ProductResponseDto.fromEntity(product);
  }
}
