import { HttpExceptionResponse } from '@common/infrastructure/interfaces/http-exception';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AccessTokenDto } from './application/dtos/access-token.dto';
import { UserProfileDto } from './application/dtos/user-profile.dto';
import { LoginUserCommand } from './application/use-cases/login/login-user.command';
import { MeQuery } from './application/use-cases/me/me.query';
import { RefreshUserCommand } from './application/use-cases/refresh/refresh-user.command';
import { RegisterUserCommand } from './application/use-cases/register/register-user.command';
import { AuthGuard } from './auth.guard';
import { UserId } from './presentation/decorators/user-id.decorator';
import { LoginDto } from './presentation/dtos/login.dto';
import { RefreshDto } from './presentation/dtos/refresh.dto';
import { RegisterDto } from './presentation/dtos/register.dto';

@Controller()
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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
  @Get('users/me')
  @UseGuards(AuthGuard)
  getHello(@UserId() userId: string) {
    return this.queryBus.execute<MeQuery, UserProfileDto>(new MeQuery(userId));
  }

  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: HttpExceptionResponse,
  })
  @ApiCreatedResponse({ type: AccessTokenDto })
  @ApiForbiddenResponse({
    description: 'Invalid credentials',
    type: HttpExceptionResponse,
  })
  @Post('auth/login')
  login(@Body() loginDto: LoginDto) {
    return this.commandBus.execute<LoginUserCommand, AccessTokenDto>(
      new LoginUserCommand(loginDto.email, loginDto.password),
    );
  }

  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: HttpExceptionResponse,
  })
  @ApiCreatedResponse({ type: AccessTokenDto })
  @ApiForbiddenResponse({
    description: 'Invalid credentials',
    type: HttpExceptionResponse,
  })
  @Post('auth/refresh')
  refresh(@Body() refreshDto: RefreshDto) {
    return this.commandBus.execute<RefreshUserCommand, AccessTokenDto>(
      new RefreshUserCommand(refreshDto.refreshToken),
    );
  }

  @ApiBadRequestResponse({
    description: 'Invalid data',
    type: HttpExceptionResponse,
  })
  @ApiCreatedResponse({ type: AccessTokenDto })
  @ApiForbiddenResponse({
    description: 'Invalid credentials',
    type: HttpExceptionResponse,
  })
  @Post('auth/register')
  register(@Body() registerDto: RegisterDto) {
    return this.commandBus.execute<RegisterUserCommand, AccessTokenDto>(
      new RegisterUserCommand(
        registerDto.email,
        registerDto.name,
        registerDto.password,
      ),
    );
  }
}
