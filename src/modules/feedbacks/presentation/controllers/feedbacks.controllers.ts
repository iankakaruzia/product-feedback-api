import { HttpExceptionResponse } from '@common/infrastructure/interfaces/http-exception';
import { UserId } from '@modules/auth/presentation/decorators/user-id.decorator';
import { AuthGuard } from '@modules/auth/presentation/guards/auth.guard';
import { FeedbackResponseDto } from '@modules/feedbacks/application/dtos/feedback-response.dto';
import { PaginatedFeedbackResponseDto } from '@modules/feedbacks/application/dtos/paginated-feedback-response.dto';
import { CreateFeedbackCommand } from '@modules/feedbacks/application/use-cases/create/create-feedback.command';
import { GetSuggestionsQuery } from '@modules/feedbacks/application/use-cases/get-suggestions/get-suggestions.query';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { IsObjectIdPipe } from '@nestjs/mongoose';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateFeedbackDto } from '../dtos/create-feedback.dto';
import { GetSuggestionsQueryParamsDto } from '../dtos/get-suggestions-query-params.dto';

@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Invalid credentials',
  type: HttpExceptionResponse,
})
@Controller('products/:productId/feedbacks')
@UseGuards(AuthGuard)
export class FeedbacksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createFeedback(
    @UserId() userId: string,
    @Param('productId', new IsObjectIdPipe()) productId: string,
    @Body() createFeedbackDto: CreateFeedbackDto,
  ) {
    return this.commandBus.execute<CreateFeedbackCommand, FeedbackResponseDto>(
      new CreateFeedbackCommand(
        createFeedbackDto.title,
        createFeedbackDto.description,
        createFeedbackDto.category,
        productId,
        userId,
      ),
    );
  }

  @ApiOkResponse({ type: PaginatedFeedbackResponseDto })
  @Get('suggestions')
  getSuggestions(
    @UserId() userId: string,
    @Param('productId', new IsObjectIdPipe()) productId: string,
    @Query() query: GetSuggestionsQueryParamsDto,
  ) {
    return this.queryBus.execute<
      GetSuggestionsQuery,
      PaginatedFeedbackResponseDto
    >(
      new GetSuggestionsQuery(
        productId,
        query.limit,
        query.cursor,
        query.search,
        query.sortBy,
        query.sortOrder,
      ),
    );
  }

  // @ApiNoContentResponse({ description: 'Product deleted' })
  // @ApiNotFoundResponse({
  //   description: 'Product not found',
  //   type: HttpExceptionResponse,
  // })
  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async deleteProductById(
  //   @UserId() userId: string,
  //   @Param('id', new IsObjectIdPipe()) id: string,
  // ) {
  //   return this.commandBus.execute<DeleteProductCommand, void>(
  //     new DeleteProductCommand(userId, id),
  //   );
  // }

  // @ApiNotFoundResponse({
  //   description: 'Product not found',
  //   type: HttpExceptionResponse,
  // })
  // @Get(':id')
  // async getProductById(
  //   @UserId() userId: string,
  //   @Param('id', new IsObjectIdPipe()) id: string,
  // ) {
  //   return this.queryBus.execute<GetProductsQuery, ProductResponseDto>(
  //     new GetProductByIdQuery(userId, id),
  //   );
  // }

  // @ApiOkResponse({ type: PaginatedProductResponseDto })
  // @Get()
  // getProducts(
  //   @UserId() userId: string,
  //   @Query() query: GetProductsQueryParamsDto,
  // ) {
  //   return this.queryBus.execute<GetProductsQuery, PaginatedProductResponseDto>(
  //     new GetProductsQuery(
  //       userId,
  //       query.limit,
  //       query.offset,
  //       query.search,
  //       query.sortOrder,
  //     ),
  //   );
  // }

  // @ApiNoContentResponse({ description: 'Product updated' })
  // @ApiNotFoundResponse({
  //   description: 'Product not found',
  //   type: HttpExceptionResponse,
  // })
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @Patch(':id')
  // async updateProductById(
  //   @UserId() userId: string,
  //   @Param('id', new IsObjectIdPipe()) id: string,
  //   @Body() updateProductDto: UpdateProductDto,
  // ) {
  //   console.log({ updateProductDto });
  //   return this.commandBus.execute<UpdateProductCommand, void>(
  //     new UpdateProductCommand(
  //       userId,
  //       id,
  //       updateProductDto.title,
  //       updateProductDto.description,
  //     ),
  //   );
  // }
}
