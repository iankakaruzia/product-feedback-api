import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { Request, Response } from 'express';

import { defaultHttpErrors } from '../constants/http-errors.constant';
import { IProblemDetail } from '../interfaces/http-exception';
import { CORRELATION_ID_HEADER } from '../services/correlation-id.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Determine the problem details title and detail
    let title: string;
    let detail: string;

    if (typeof exceptionResponse === 'string') {
      title = HttpStatus[status] || 'Error';
      detail = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse != null
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      title = (exceptionResponse as any).error || HttpStatus[status] || 'Error';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      detail = (exceptionResponse as any).message || 'An error occurred';
    } else {
      title = HttpStatus[status] || 'Error';
      detail = 'An unexpected error occurred.';
    }

    const problemDetail: IProblemDetail = {
      correlationId:
        (request.headers[CORRELATION_ID_HEADER] as string) || createId(),
      detail: detail,
      instance: request.url,
      status: status,
      timestamp: new Date().toISOString(),
      title: title,
      type: defaultHttpErrors[status],
    };

    // Add additional properties from the original exception response if it's an object
    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse != null &&
      !Array.isArray(exceptionResponse)
    ) {
      Object.keys(exceptionResponse).forEach((key) => {
        if (!['error', 'message', 'statusCode'].includes(key)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          (problemDetail as any)[key] = (exceptionResponse as any)[key];
        }
      });
    }

    this.logger.error(
      `Request ${request.url} failed with status code ${status}`,
      exception.stack,
    );

    response.setHeader('Content-Type', 'application/problem+json');
    response.status(status).json(problemDetail);
  }
}
