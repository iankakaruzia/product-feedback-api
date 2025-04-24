import { Entity } from '@common/domain/entities/entity';
import { Types } from 'mongoose';

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
    product.id = new Types.ObjectId().toHexString();
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
