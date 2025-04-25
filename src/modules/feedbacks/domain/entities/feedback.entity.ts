import { Entity } from '@common/domain/entities/entity';
import { Types } from 'mongoose';

import { Category } from '../types/category.type';
import { Status, Statuses } from '../types/status.type';

export class Feedback extends Entity {
  category: Category;
  description: string;
  ownerId: string;
  productId: string;
  status: Status;
  title: string;

  public static create(
    title: string,
    description: string,
    category: Category,
    productId: string,
    ownerId: string,
  ): Feedback {
    const feedback = new Feedback();
    feedback.title = title;
    feedback.description = description;
    feedback.ownerId = ownerId;
    feedback.category = category;
    feedback.status = Statuses.Suggestion;
    feedback.productId = productId;
    feedback.id = new Types.ObjectId().toHexString();
    feedback.createdAt = new Date();

    return feedback;
  }

  public static update(
    feedback: Feedback,
    {
      category,
      description,
      status,
      title,
    }: {
      category?: Category;
      description?: string;
      status?: Status;
      title?: string;
    },
  ): Feedback {
    feedback.title = title || feedback.title;
    feedback.description = description || feedback.description;
    feedback.category = category || feedback.category;
    feedback.status = status || feedback.status;
    feedback.updatedAt = new Date();

    return feedback;
  }
}
