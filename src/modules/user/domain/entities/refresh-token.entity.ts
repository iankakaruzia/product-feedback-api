import { addDays } from 'date-fns/addDays';
import { nanoid } from 'nanoid';

export class RefreshToken {
  expiresAt: Date;
  token: string;
  userId: string;

  public static create(userId: string): RefreshToken {
    const refreshToken = new RefreshToken();
    refreshToken.token = nanoid(32);
    refreshToken.userId = userId;
    refreshToken.expiresAt = addDays(new Date(), 7);

    return refreshToken;
  }

  public static update(refreshToken: RefreshToken): RefreshToken {
    refreshToken.token = nanoid(32);
    refreshToken.expiresAt = addDays(new Date(), 7);

    return refreshToken;
  }
}
