import { FeedbacksRepository } from '@modules/feedbacks/domain/abstractions/feedbacks.repository';
import { Feedback } from '@modules/feedbacks/domain/entities/feedback.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FeedbackResponseDto } from '../../dtos/feedback-response.dto';
import { CreateFeedbackCommand } from './create-feedback.command';

@CommandHandler(CreateFeedbackCommand)
export class CreateFeedbackHandler
  implements ICommandHandler<CreateFeedbackCommand>
{
  constructor(private readonly feedbacksRepository: FeedbacksRepository) {}

  async execute(command: CreateFeedbackCommand): Promise<FeedbackResponseDto> {
    const feedback = Feedback.create(
      command.title,
      command.description,
      command.category,
      command.productId,
      command.ownerId,
    );

    await this.feedbacksRepository.create(feedback);

    return FeedbackResponseDto.fromEntity(feedback);
  }
}
