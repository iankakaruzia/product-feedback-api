import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { JwtService } from './domain/abstractions/jwt.service';
import { NestJwtService } from './infrastructure/services/nest-jwt.service';

@Module({
  exports: [JwtService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '30m' },
      }),
    }),
  ],
  providers: [
    {
      provide: JwtService,
      useClass: NestJwtService,
    },
  ],
})
export class AuthModule {}
