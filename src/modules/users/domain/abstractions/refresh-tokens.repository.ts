import { RefreshToken } from '../entities/refresh-token.entity';

export abstract class RefreshTokensRepository {
  abstract getByToken(token: string): Promise<null | RefreshToken>;
  abstract upsert(entity: RefreshToken): Promise<void>;
}
