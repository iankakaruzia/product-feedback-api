import { CorrelationIdMiddleware } from '@common/infrastructure/middlewares/correlation-id.middleware';
import { CorrelationIdService } from '@common/infrastructure/services/correlation-id.service';
import { AuthModule } from '@modules/auth/auth.module';
import { FeedbacksModule } from '@modules/feedbacks/feedbacks.module';
import { ProductsModule } from '@modules/products/products.module';
import { UsersModule } from '@modules/users/users.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { createId } from '@paralleldrive/cuid2';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dbName: config.get('MONGODB_DB_NAME'),
        uri: config.get('MONGODB_URI'),
      }),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,
        genReqId: (request) =>
          request.headers['x-correlation-id'] || createId(),
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        quietReqLogger: true,
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    FeedbacksModule,
  ],
  providers: [CorrelationIdService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationIdMiddleware)
      .exclude({ method: RequestMethod.OPTIONS, path: '*' })
      .forRoutes({ method: RequestMethod.ALL, path: '*' });
  }
}
