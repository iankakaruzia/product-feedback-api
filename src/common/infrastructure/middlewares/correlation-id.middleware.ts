import { Injectable, NestMiddleware } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { NextFunction, Request, Response } from 'express';

import { CorrelationIdService } from '../services/correlation-id.service';

const CORRELATION_ID_HEADER = 'x-correlation-id';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(private readonly correlationIdService: CorrelationIdService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const currentCorrelationId = this.correlationIdService.getCorrelationId();

    if (!currentCorrelationId) {
      const providedCorrelationId = req.headers[
        CORRELATION_ID_HEADER
      ] as string;
      this.correlationIdService.setCorrelationId(
        providedCorrelationId ?? createId(),
      );
    }

    req.headers[CORRELATION_ID_HEADER] =
      this.correlationIdService.getCorrelationId();
    res.setHeader(
      CORRELATION_ID_HEADER,
      this.correlationIdService.getCorrelationId(),
    );

    next();
  }
}
