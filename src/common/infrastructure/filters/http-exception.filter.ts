import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { Request, Response } from 'express';

import { HttpExceptionResponse } from '../interfaces/http-exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.error(
      `Request ${request.url} failed with status code ${status}`,
      exception.stack,
    );

    const httpResponse: HttpExceptionResponse = {
      id: (request.headers['x-correlation-id'] as string) || createId(),
      message: exception.message,
      path: request.url,
      statusCode: status,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(httpResponse);
  }
}
