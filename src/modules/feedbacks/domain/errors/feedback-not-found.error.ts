import { NotFoundException } from '@nestjs/common';

export class FeedbackNotFoundError extends NotFoundException {
  constructor() {
    super('Feedback not found');
  }
}
