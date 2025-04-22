import { PaginatedResult } from '@common/domain/interfaces/pagination.interface';
import {
  ProductsArgs,
  ProductsFindArgs,
  ProductsRepository,
} from '@modules/products/domain/abstractions/products.repository';
import { Product as ProductEntity } from '@modules/products/domain/entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './schemas/product.schema';

export class MongoProductsRepository implements ProductsRepository {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(product: ProductEntity): Promise<void> {
    await this.productModel.create(product);
  }

  async delete(args: ProductsArgs): Promise<null | void> {
    const product = await this.productModel.findOne({
      id: args.id,
      ownerId: args.ownerId,
    });

    if (!product) {
      return null;
    }

    await product.deleteOne();
  }

  async findById(args: ProductsArgs): Promise<null | ProductEntity> {
    const product = await this.productModel.findOne({
      id: args.id,
      ownerId: args.ownerId,
    });

    if (!product) {
      return null;
    }

    return product.toObject();
  }

  async findPaginated(
    args: ProductsFindArgs,
  ): Promise<PaginatedResult<ProductEntity>> {
    const sortOrder = args.sortOrder ?? 'asc';
    const offset = args.offset ?? 0;
    const limit = args.limit ?? 10;

    const products = await this.productModel
      .find({
        ownerId: args.ownerId,
      })
      .sort({ createdAt: sortOrder })
      .skip(offset)
      .limit(limit);

    const total = await this.productModel.countDocuments({
      ownerId: args.ownerId,
    });

    return {
      currentPage: offset / limit,
      hasNextPage: offset + limit < total,
      hasPreviousPage: offset > 0,
      items: products.map((product) => product.toObject()),
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(product: ProductEntity): Promise<void> {
    await this.productModel.findOneAndUpdate(
      { id: product.id, ownerId: product.ownerId },
      product,
      {
        new: true,
      },
    );
  }
}
