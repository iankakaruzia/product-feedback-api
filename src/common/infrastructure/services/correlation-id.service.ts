import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class CorrelationIdService {
  private correlationId: string;

  getCorrelationId(): string {
    return this.correlationId;
  }

  setCorrelationId(correlationId: string): void {
    this.correlationId = correlationId;
  }
}
