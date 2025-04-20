import { HttpExceptionFilter } from '@common/infrastructure/filters/http-exception.filter';
import { LoggingInterceptor } from '@common/infrastructure/interceptors/logging.interceptor';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createId } from '@paralleldrive/cuid2';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors();

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.use(helmet());

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Product Feedback API')
    .setDescription('API for product feedback')
    .setVersion('1.0')
    .addBearerAuth()
    .addGlobalParameters({
      content: {
        'application/json': {
          schema: {
            default: createId(),
            type: 'string',
          },
        },
      },
      in: 'header',
      name: 'x-correlation-id',
      required: false,
      schema: { type: 'string' },
    })
    .addServer('http://localhost:3000')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
