import { PaginatedResult } from '@common/domain/interfaces/pagination.interface';
import { MongoMappings } from '@common/infrastructure/repositories/mongo.mappings';
import {
  ProductsArgs,
  ProductsFindArgs,
  ProductsRepository,
} from '@modules/products/domain/abstractions/products.repository';
import { Product as ProductEntity } from '@modules/products/domain/entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductMappings } from './mappings/product.mappings';
import { Product } from './schemas/product.schema';

export class MongoProductsRepository implements ProductsRepository {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(product: ProductEntity): Promise<void> {
    await this.productModel.create({
      ...product,
      _id: MongoMappings.toObjectId(product.id),
      owner: MongoMappings.toObjectId(product.ownerId),
    });
  }

  async delete(product: ProductEntity): Promise<void> {
    await this.productModel.deleteOne({
      _id: MongoMappings.toObjectId(product.id),
      owner: MongoMappings.toObjectId(product.ownerId),
    });
  }

  async findById(args: ProductsArgs): Promise<null | ProductEntity> {
    const product = await this.productModel.findOne({
      _id: MongoMappings.toObjectId(args.id),
      owner: MongoMappings.toObjectId(args.ownerId),
    });

    if (!product) {
      return null;
    }

    return ProductMappings.toDomain(product);
  }

  async findPaginated(
    args: ProductsFindArgs,
  ): Promise<PaginatedResult<ProductEntity>> {
    const sortOrder = args.sortOrder ?? 'asc';
    const offset = args.offset ?? 0;
    const limit = args.limit ?? 10;
    const search = args.search ?? '';

    const products = await this.productModel
      .find({
        $or: [
          { title: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
        ],
        owner: MongoMappings.toObjectId(args.ownerId),
      })
      .sort({ createdAt: sortOrder })
      .skip(offset)
      .limit(limit);

    const total = await this.productModel.countDocuments({
      $or: [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ],
      owner: MongoMappings.toObjectId(args.ownerId),
    });

    return {
      currentPage: offset / limit,
      hasNextPage: offset + limit < total,
      hasPreviousPage: offset > 0,
      items: products.map((product) => ProductMappings.toDomain(product)),
      pageSize: limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(product: ProductEntity): Promise<void> {
    await this.productModel.updateOne(
      {
        _id: MongoMappings.toObjectId(product.id),
        owner: MongoMappings.toObjectId(product.ownerId),
      },
      product,
      {
        new: true,
      },
    );
  }
}
