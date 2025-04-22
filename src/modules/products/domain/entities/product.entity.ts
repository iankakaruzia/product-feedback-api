import { Entity } from '@common/domain/entities/entity';
import { createId } from '@paralleldrive/cuid2';

export class Product extends Entity {
  description: string;
  ownerId: string;
  title: string;

  public static create(
    title: string,
    description: string,
    ownerId: string,
  ): Product {
    const product = new Product();
    product.title = title;
    product.description = description;
    product.ownerId = ownerId;
    product.id = createId();
    product.createdAt = new Date();

    return product;
  }

  public static update(
    product: Product,
    title: string,
    description: string,
  ): Product {
    product.title = title;
    product.description = description;
    product.updatedAt = new Date();

    return product;
  }
}
