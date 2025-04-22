import { HttpExceptionResponse } from '@common/infrastructure/interfaces/http-exception';
import { UserId } from '@modules/auth/presentation/decorators/user-id.decorator';
import { AuthGuard } from '@modules/auth/presentation/guards/auth.guard';
import { CreateProductCommand } from '@modules/products/application/use-cases/create/create-product.command';
import { Product } from '@modules/products/domain/entities/product.entity';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateProductDto } from '../dtos/create-product.dto';

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
  constructor(private readonly commandBus: CommandBus) {}

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
}
