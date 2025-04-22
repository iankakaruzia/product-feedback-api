import { HttpExceptionResponse } from '@common/infrastructure/interfaces/http-exception';
import { UserId } from '@modules/auth/presentation/decorators/user-id.decorator';
import { AuthGuard } from '@modules/auth/presentation/guards/auth.guard';
import { PaginatedProductResponseDto } from '@modules/products/application/dtos/paginated-product-response.dto';
import { CreateProductCommand } from '@modules/products/application/use-cases/create/create-product.command';
import { GetProductsQuery } from '@modules/products/application/use-cases/get/get-products.query';
import { Product } from '@modules/products/domain/entities/product.entity';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateProductDto } from '../dtos/create-product.dto';
import { GetProductsQueryParamsDto } from '../dtos/get-products-query-params.dto';

@ApiBearerAuth()
@ApiNotFoundResponse({
  description: 'Product not found',
  type: HttpExceptionResponse,
})
@ApiUnauthorizedResponse({
  description: 'Invalid credentials',
  type: HttpExceptionResponse,
})
@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createProduct(
    @UserId() userId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.commandBus.execute<CreateProductCommand, Product>(
      new CreateProductCommand(
        createProductDto.title,
        createProductDto.description,
        userId,
      ),
    );
  }

  @ApiOkResponse({ type: PaginatedProductResponseDto })
  @Get()
  getProducts(
    @UserId() userId: string,
    @Query() query: GetProductsQueryParamsDto,
  ) {
    return this.queryBus.execute<GetProductsQuery, PaginatedProductResponseDto>(
      new GetProductsQuery(
        userId,
        query.limit,
        query.offset,
        query.search,
        query.sortOrder,
      ),
    );
  }
}
