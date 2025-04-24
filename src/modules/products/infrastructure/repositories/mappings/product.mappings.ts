import { MongoMappings } from '@common/infrastructure/repositories/mongo.mappings';
import { Product as ProductEntity } from '@modules/products/domain/entities/product.entity';

import { Product } from '../schemas/product.schema';

export class ProductMappings {
  public static toDomain(product: Product): ProductEntity {
    const productDomain = new ProductEntity();

    productDomain.description = product.description;
    productDomain.id = MongoMappings.toString(product._id);
    productDomain.ownerId = product.owner.toHexString();
    productDomain.title = product.title;
    productDomain.createdAt = product.createdAt;
    productDomain.updatedAt = product.updatedAt;

    return productDomain;
  }
}
