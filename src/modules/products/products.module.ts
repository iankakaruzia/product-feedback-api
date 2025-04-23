import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateProductHandler } from './application/use-cases/create/create-product.handler';
import { GetProductByIdHandler } from './application/use-cases/get-by-id/get-product-by-id.handler';
import { GetProductsHandler } from './application/use-cases/get/get-products.handler';
import { ProductsRepository } from './domain/abstractions/products.repository';
import { MongoProductsRepository } from './infrastructure/repositories/mongo-products.repository';
import {
  Product,
  ProductSchema,
} from './infrastructure/repositories/schemas/product.schema';
import { ProductsController } from './presentation/controllers/products.controllers';

@Module({
  controllers: [ProductsController],
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AuthModule,
  ],
  providers: [
    {
      provide: ProductsRepository,
      useClass: MongoProductsRepository,
    },
    CreateProductHandler,
    GetProductsHandler,
    GetProductByIdHandler,
  ],
})
export class ProductsModule {}
