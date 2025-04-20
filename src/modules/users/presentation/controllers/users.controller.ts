import { HttpExceptionResponse } from '@common/infrastructure/interfaces/http-exception';
import { UserId } from '@common/presentation/decorators/user-id.decorator';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserProfileDto } from '../../application/dtos/user-profile.dto';
import { MeQuery } from '../../application/use-cases/me/me.query';
import { AuthGuard } from '../guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiBearerAuth()
  @ApiNotFoundResponse({
    description: 'User not found',
    type: HttpExceptionResponse,
  })
  @ApiOkResponse({ type: UserProfileDto })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    type: HttpExceptionResponse,
  })
  @Get('me')
  getMe(@UserId() userId: string) {
    return this.queryBus.execute<MeQuery, UserProfileDto>(new MeQuery(userId));
  }
}
