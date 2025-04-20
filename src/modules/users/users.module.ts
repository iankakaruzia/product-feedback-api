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
import { RefreshTokensRepository } from './domain/abstractions/refresh-tokens.repository';
import { UsersRepository } from './domain/abstractions/users.repository';
import { MongoRefreshTokensRepository } from './infrastructure/repositories/mongo-refresh-tokens.repository';
import { MongoUsersRepository } from './infrastructure/repositories/mongo-users.repository';
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
import { AuthController } from './presentation/controllers/auth.controller';
import { UsersController } from './presentation/controllers/users.controller';

@Module({
  controllers: [UsersController, AuthController],
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
      provide: UsersRepository,
      useClass: MongoUsersRepository,
    },
    {
      provide: RefreshTokensRepository,
      useClass: MongoRefreshTokensRepository,
    },
    RegisterUserHandler,
    LoginUserHandler,
    MeHandler,
    RefreshUserHandler,
  ],
})
export class UsersModule {}
