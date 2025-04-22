import { NotFoundException } from '@nestjs/common';

export class ProductNotFoundError extends NotFoundException {
  constructor() {
    super('Product not found');
  }
}
