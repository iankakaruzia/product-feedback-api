import { MongoMappings } from '@common/infrastructure/repositories/mongo.mappings';
import { Feedback as FeedbackEntity } from '@modules/feedbacks/domain/entities/feedback.entity';

import { Feedback } from '../schemas/feedback.schema';

export class FeedbackMappings {
  static toDomain(feedback: Feedback): FeedbackEntity {
    const feedbackDomain = new FeedbackEntity();

    feedbackDomain.category = feedback.category;
    feedbackDomain.description = feedback.description;
    feedbackDomain.id = MongoMappings.toString(feedback._id);
    feedbackDomain.ownerId = feedback.owner.toHexString();
    feedbackDomain.productId = feedback.product.toHexString();
    feedbackDomain.status = feedback.status;
    feedbackDomain.title = feedback.title;
    feedbackDomain.createdAt = feedback.createdAt;
    feedbackDomain.updatedAt = feedback.updatedAt;

    return feedbackDomain;
  }
}
