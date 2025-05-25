import { Injectable, Scope } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { ClsService, ClsStore } from 'nestjs-cls';

export const CORRELATION_ID_HEADER = 'x-correlation-id';
export const CORRELATION_ID_KEY = 'correlationId';

export interface CorrelationIdStore extends ClsStore {
  correlationId: string;
}

@Injectable({ scope: Scope.REQUEST })
export class CorrelationIdService {
  constructor(private readonly cls: ClsService<CorrelationIdStore>) {}

  getCorrelationId(): string {
    return this.cls.get(CORRELATION_ID_KEY) ?? createId();
  }

  setCorrelationId(correlationId: string): void {
    this.cls.set(CORRELATION_ID_KEY, correlationId);
  }
}
