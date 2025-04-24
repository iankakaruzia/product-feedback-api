import { ProductsRepository } from '@modules/products/domain/abstractions/products.repository';
import { Product } from '@modules/products/domain/entities/product.entity';
import { ProductNotFoundError } from '@modules/products/domain/errors/product-not-found.error';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateProductCommand } from './update-product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(command: UpdateProductCommand): Promise<void> {
    const product = await this.productsRepository.findById({
      id: command.productId,
      ownerId: command.ownerId,
    });

    if (!product) {
      throw new ProductNotFoundError();
    }

    const title = command.title ?? product.title;
    const description = command.description ?? product.description;

    Product.update(product, title, description);

    await this.productsRepository.update(product);
  }
}
