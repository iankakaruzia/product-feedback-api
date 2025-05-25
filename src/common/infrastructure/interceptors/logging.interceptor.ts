import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const handler = context.getHandler();
    const requestName = `${context.getClass().name}.${handler.name}`;

    this.logger.log(`Processing request ${requestName}`);

    return next.handle().pipe(
      tap(() => {
        const delayMs = Date.now() - now;
        this.logger.log(`Completed request ${requestName} in ${delayMs}ms`, {
          delayMs,
          requestName,
        });
      }),
    );
  }
}
