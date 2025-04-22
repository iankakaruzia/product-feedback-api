import { JwtService } from '@modules/auth/domain/abstractions/jwt.service';
import { CryptographyService } from '@modules/users/domain/abstractions/cryptography.service';
import { RefreshTokensRepository } from '@modules/users/domain/abstractions/refresh-tokens.repository';
import { UsersRepository } from '@modules/users/domain/abstractions/users.repository';
import { RefreshToken } from '@modules/users/domain/entities/refresh-token.entity';
import { InvalidCredentialsError } from '@modules/users/domain/errors/invalid-credentials.error';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AccessTokenDto } from '../../dtos/access-token.dto';
import { LoginUserCommand } from './login-user.command';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly refreshTokenRepository: RefreshTokensRepository,
    private readonly cryptography: CryptographyService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginUserCommand): Promise<AccessTokenDto> {
    const user = await this.userRepository.findByEmail(command.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await this.cryptography.verify(
      user.password,
      command.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const payload = { email: user.email, sub: user.id };

    const refreshToken = RefreshToken.create(user.id);

    await this.refreshTokenRepository.upsert(refreshToken);

    return {
      accessToken: await this.jwtService.sign(payload),
      refreshToken: refreshToken.token,
    };
  }
}
