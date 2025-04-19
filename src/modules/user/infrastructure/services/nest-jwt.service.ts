import { JwtService } from '@modules/user/domain/abstractions/jwt.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as InternalJwtService } from '@nestjs/jwt';

@Injectable()
export class NestJwtService implements JwtService {
  constructor(
    private readonly jwtService: InternalJwtService,
    private readonly configService: ConfigService,
  ) {}

  sign(payload: Record<string, string>): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  verify(token: string): Promise<Record<string, string>> {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
