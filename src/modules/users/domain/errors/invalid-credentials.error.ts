import { ForbiddenException } from '@nestjs/common';

export class InvalidCredentialsError extends ForbiddenException {
  constructor() {
    super('Invalid credentials');
  }
}
