import { HttpExceptionResponse } from '@common/infrastructure/interfaces/http-exception';
import { UserId } from '@modules/auth/presentation/decorators/user-id.decorator';
import { AuthGuard } from '@modules/auth/presentation/guards/auth.guard';
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

@ApiBearerAuth()
@ApiNotFoundResponse({
  description: 'User not found',
  type: HttpExceptionResponse,
})
@ApiUnauthorizedResponse({
  description: 'Invalid credentials',
  type: HttpExceptionResponse,
})
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOkResponse({ type: UserProfileDto })
  @Get('me')
  getMe(@UserId() userId: string) {
    return this.queryBus.execute<MeQuery, UserProfileDto>(new MeQuery(userId));
  }
}
