import { JwtService } from '@modules/auth/domain/abstractions/jwt.service';
import { CryptographyService } from '@modules/users/domain/abstractions/cryptography.service';
import { RefreshTokensRepository } from '@modules/users/domain/abstractions/refresh-tokens.repository';
import { UsersRepository } from '@modules/users/domain/abstractions/users.repository';
import { RefreshToken } from '@modules/users/domain/entities/refresh-token.entity';
import { User } from '@modules/users/domain/entities/user.entity';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AccessTokenDto } from '../../dtos/access-token.dto';
import { RegisterUserCommand } from './register-user.command';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  private readonly logger = new Logger(RegisterUserHandler.name);

  constructor(
    private readonly userRepository: UsersRepository,
    private readonly refreshTokenRepository: RefreshTokensRepository,
    private readonly cryptography: CryptographyService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: RegisterUserCommand): Promise<AccessTokenDto> {
    const hashedPassword = await this.cryptography.hash(command.password);
    const user = User.create(command.email, command.name, hashedPassword);

    const payload = { email: user.email, sub: user.id };

    await this.userRepository.create(user);

    const refreshToken = RefreshToken.create(user.id);

    await this.refreshTokenRepository.upsert(refreshToken);

    this.logger.log(`Registered user ${user.id}`);

    return {
      accessToken: await this.jwtService.sign(payload),
      refreshToken: refreshToken.token,
    };
  }
}
