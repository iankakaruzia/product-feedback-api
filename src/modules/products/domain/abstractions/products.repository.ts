import {
  PaginatedQuery,
  PaginatedResult,
} from '@common/domain/interfaces/pagination.interface';

import { Product } from '../entities/product.entity';

export type ProductsArgs = {
  id: string;
  ownerId: string;
};

export type ProductsFindArgs = PaginatedQuery & {
  ownerId: string;
};

export abstract class ProductsRepository {
  abstract create(product: Product): Promise<void>;
  abstract delete(args: ProductsArgs): Promise<null | void>;
  abstract findById(args: ProductsArgs): Promise<null | Product>;
  abstract findPaginated(
    args: ProductsFindArgs,
  ): Promise<PaginatedResult<Product>>;
  abstract update(product: Product): Promise<void>;
}
