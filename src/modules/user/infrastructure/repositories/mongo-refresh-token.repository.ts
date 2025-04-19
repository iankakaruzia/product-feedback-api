import { RefreshTokenRepository } from '@modules/user/domain/abstractions/refresh-token.repository';
import { RefreshToken as RefreshTokenEntity } from '@modules/user/domain/entities/refresh-token.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RefreshToken } from './schemas/refresh-token.schema';

export class MongoRefreshTokenRepository implements RefreshTokenRepository {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {}

  async getByToken(token: string): Promise<null | RefreshTokenEntity> {
    const refreshToken = await this.refreshTokenModel.findOne({ token });

    if (!refreshToken) {
      return null;
    }

    return refreshToken.toObject();
  }

  async upsert(entity: RefreshTokenEntity): Promise<void> {
    const refreshToken = await this.refreshTokenModel.findOneAndUpdate(
      { userId: entity.userId },
      entity,
      {
        new: true,
      },
    );

    if (!refreshToken) {
      await this.refreshTokenModel.create(entity);
    }
  }
}
