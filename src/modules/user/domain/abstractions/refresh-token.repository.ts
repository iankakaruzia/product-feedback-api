import { RefreshToken } from '../entities/refresh-token.entity';

export abstract class RefreshTokenRepository {
  abstract getByToken(token: string): Promise<null | RefreshToken>;
  abstract upsert(entity: RefreshToken): Promise<void>;
}
