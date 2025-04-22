import { HttpExceptionResponse } from '@common/infrastructure/interfaces/http-exception';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import { AccessTokenDto } from '../../application/dtos/access-token.dto';
import { LoginUserCommand } from '../../application/use-cases/login/login-user.command';
import { RefreshUserCommand } from '../../application/use-cases/refresh/refresh-user.command';
import { RegisterUserCommand } from '../../application/use-cases/register/register-user.command';
import { LoginDto } from '../dtos/login.dto';
import { RefreshDto } from '../dtos/refresh.dto';
import { RegisterDto } from '../dtos/register.dto';

@ApiBadRequestResponse({
  description: 'Invalid data',
  type: HttpExceptionResponse,
})
@ApiCreatedResponse({ type: AccessTokenDto })
@ApiForbiddenResponse({
  description: 'Invalid credentials',
  type: HttpExceptionResponse,
})
@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.commandBus.execute<LoginUserCommand, AccessTokenDto>(
      new LoginUserCommand(loginDto.email, loginDto.password),
    );
  }

  @Post('refresh')
  refresh(@Body() refreshDto: RefreshDto) {
    return this.commandBus.execute<RefreshUserCommand, AccessTokenDto>(
      new RefreshUserCommand(refreshDto.refreshToken),
    );
  }

  @Post('register')
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
