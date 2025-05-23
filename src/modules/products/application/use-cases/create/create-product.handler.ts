import { ProductsRepository } from '@modules/products/domain/abstractions/products.repository';
import { Product } from '@modules/products/domain/entities/product.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ProductResponseDto } from '../../dtos/product-response.dto';
import { CreateProductCommand } from './create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(command: CreateProductCommand): Promise<ProductResponseDto> {
    const product = Product.create(
      command.title,
      command.description,
      command.ownerId,
    );

    await this.productsRepository.create(product);

    return ProductResponseDto.fromEntity(product);
  }
}
