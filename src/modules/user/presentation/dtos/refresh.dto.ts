import { MinLength } from 'class-validator';

export class RefreshDto {
  @MinLength(32)
  refreshToken: string;
}
