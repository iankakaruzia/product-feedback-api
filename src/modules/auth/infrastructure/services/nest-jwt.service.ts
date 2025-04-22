import { JwtService as AbstractionJwtService } from '@modules/auth/domain/abstractions/jwt.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class NestJwtService implements AbstractionJwtService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  sign(payload: Record<string, string>): Promise<string> {
    // return Promise.resolve('test');
    return this.jwtService.signAsync(payload);
  }

  verify(token: string): Promise<Record<string, string>> {
    // return Promise.resolve({});
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
