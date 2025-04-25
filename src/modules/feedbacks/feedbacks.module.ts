import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateFeedbackHandler } from './application/use-cases/create/create-feedback.handler';
import { GetSuggestionsHandler } from './application/use-cases/get-suggestions/get-suggestions.handler';
import { FeedbacksRepository } from './domain/abstractions/feedbacks.repository';
import { MongoFeedbacksRepository } from './infrastructure/repositories/mongo-feedbacks.repository';
import {
  Feedback,
  FeedbackSchema,
} from './infrastructure/repositories/schemas/feedback.schema';
import { FeedbacksController } from './presentation/controllers/feedbacks.controllers';

@Module({
  controllers: [FeedbacksController],
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: Feedback.name, schema: FeedbackSchema },
    ]),
    AuthModule,
  ],
  providers: [
    {
      provide: FeedbacksRepository,
      useClass: MongoFeedbacksRepository,
    },
    CreateFeedbackHandler,
    GetSuggestionsHandler,
  ],
})
export class FeedbacksModule {}
