import { ProductsRepository } from '@modules/products/domain/abstractions/products.repository';
import { ProductNotFoundError } from '@modules/products/domain/errors/product-not-found.error';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteProductCommand } from './delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    const product = await this.productsRepository.findById({
      id: command.productId,
      ownerId: command.ownerId,
    });

    if (!product) {
      throw new ProductNotFoundError();
    }

    await this.productsRepository.delete(product);
  }
}
