import { CursorPaginatedResult } from '@common/domain/interfaces/pagination.interface';
import { MongoMappings } from '@common/infrastructure/repositories/mongo.mappings';
import {
  FeedbackArgs,
  FeedbackFindArgs,
  FeedbacksRepository,
} from '@modules/feedbacks/domain/abstractions/feedbacks.repository';
import { Feedback as FeedbackEntity } from '@modules/feedbacks/domain/entities/feedback.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { FeedbackMappings } from './mappings/feedbacks.mappings';
import { Feedback } from './schemas/feedback.schema';

export class MongoFeedbacksRepository implements FeedbacksRepository {
  constructor(
    @InjectModel(Feedback.name) private readonly feedbackModel: Model<Feedback>,
  ) {}

  async create(feedback: FeedbackEntity): Promise<void> {
    await this.feedbackModel.create({
      ...feedback,
      _id: MongoMappings.toObjectId(feedback.id),
      owner: MongoMappings.toObjectId(feedback.ownerId),
      product: MongoMappings.toObjectId(feedback.productId),
    });
  }

  async delete(feedback: FeedbackEntity): Promise<void> {
    await this.feedbackModel.deleteOne({
      _id: MongoMappings.toObjectId(feedback.id),
      owner: MongoMappings.toObjectId(feedback.ownerId),
    });
  }

  async findById(args: FeedbackArgs): Promise<FeedbackEntity | null> {
    const feedback = await this.feedbackModel.findOne({
      _id: MongoMappings.toObjectId(args.id),
      owner: MongoMappings.toObjectId(args.ownerId),
    });

    if (!feedback) {
      return null;
    }

    return FeedbackMappings.toDomain(feedback);
  }

  async findPaginated(
    args: FeedbackFindArgs,
  ): Promise<CursorPaginatedResult<FeedbackEntity>> {
    const sortOrder = args.sortOrder ?? 'asc';
    const limit = args.limit ?? 10;
    const search = args.search ?? '';
    const sortBy = args.sortBy ?? 'upvotes';
    const nextCursor = args.cursor || null;

    let feedbacksQuery = this.feedbackModel
      .find({
        $or: [
          { title: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
        ],
        product: MongoMappings.toObjectId(args.productId),
      })
      .sort({ _id: 1, [sortBy]: sortOrder });

    if (nextCursor) {
      feedbacksQuery = feedbacksQuery.find({
        _id: { $gte: MongoMappings.toObjectId(nextCursor) },
      });
    }

    const feedbacks = await feedbacksQuery.limit(limit + 1);

    const total = await this.feedbackModel.countDocuments();

    return {
      items: feedbacks
        .slice(0, limit)
        .map((item) => FeedbackMappings.toDomain(item)),
      metadata: {
        hasNextPage: feedbacks.length > limit,
        limit,
        nextCursor:
          feedbacks.length > limit ? feedbacks[limit]._id.toString() : null,
        total,
      },
    };
  }

  async update(feedback: FeedbackEntity): Promise<void> {
    await this.feedbackModel.updateOne(
      {
        _id: MongoMappings.toObjectId(feedback.id),
        owner: MongoMappings.toObjectId(feedback.ownerId),
      },
      feedback,
      {
        new: true,
      },
    );
  }
}
