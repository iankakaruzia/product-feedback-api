import { JwtService } from '@modules/user/domain/abstractions/jwt.service';
import { RefreshTokenRepository } from '@modules/user/domain/abstractions/refresh-token.repository';
import { UserRepository } from '@modules/user/domain/abstractions/user.repository';
import { RefreshToken } from '@modules/user/domain/entities/refresh-token.entity';
import { InvalidTokenError } from '@modules/user/domain/errors/invalid-token.error';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { isAfter } from 'date-fns/isAfter';

import { AccessTokenDto } from '../../dtos/access-token.dto';
import { RefreshUserCommand } from './refresh-user.command';

@CommandHandler(RefreshUserCommand)
export class RefreshUserHandler implements ICommandHandler<RefreshUserCommand> {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: RefreshUserCommand): Promise<AccessTokenDto> {
    const refreshToken = await this.refreshTokenRepository.getByToken(
      command.refreshToken,
    );

    if (!refreshToken) {
      throw new InvalidTokenError();
    }

    const isExpired = isAfter(new Date(), refreshToken.expiresAt);

    if (isExpired) {
      throw new InvalidTokenError();
    }

    const user = await this.userRepository.findById(refreshToken.userId);

    if (!user) {
      throw new InvalidTokenError();
    }

    const payload = { email: user.email, sub: user.id };

    const newRefreshToken = RefreshToken.update(refreshToken);

    await this.refreshTokenRepository.upsert(newRefreshToken);

    return {
      accessToken: await this.jwtService.sign(payload),
      refreshToken: newRefreshToken.token,
    };
  }
}
