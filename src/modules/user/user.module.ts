import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { LoginUserHandler } from './application/use-cases/login/login-user.handler';
import { MeHandler } from './application/use-cases/me/me.handler';
import { RefreshUserHandler } from './application/use-cases/refresh/refresh-user.handler';
import { RegisterUserHandler } from './application/use-cases/register/register-user.handler';
import { CryptographyService } from './domain/abstractions/cryptography.service';
import { JwtService } from './domain/abstractions/jwt.service';
import { RefreshTokenRepository } from './domain/abstractions/refresh-token.repository';
import { UserRepository } from './domain/abstractions/user.repository';
import { MongoRefreshTokenRepository } from './infrastructure/repositories/mongo-refresh-token.repository';
import { MongoUserRepository } from './infrastructure/repositories/mongo-user.repository';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './infrastructure/repositories/schemas/refresh-token.schema';
import {
  User,
  UserSchema,
} from './infrastructure/repositories/schemas/user.schema';
import { ArgonCryptographyService } from './infrastructure/services/argon-cryptography.service';
import { NestJwtService } from './infrastructure/services/nest-jwt.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [
    CqrsModule,
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
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
  ],
  providers: [
    {
      provide: CryptographyService,
      useClass: ArgonCryptographyService,
    },
    {
      provide: JwtService,
      useClass: NestJwtService,
    },
    {
      provide: UserRepository,
      useClass: MongoUserRepository,
    },
    {
      provide: RefreshTokenRepository,
      useClass: MongoRefreshTokenRepository,
    },
    RegisterUserHandler,
    LoginUserHandler,
    MeHandler,
    RefreshUserHandler,
  ],
})
export class UserModule {}
