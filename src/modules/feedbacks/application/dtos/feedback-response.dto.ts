import { Feedback } from '@modules/feedbacks/domain/entities/feedback.entity';
import { Category } from '@modules/feedbacks/domain/types/category.type';
import { Status } from '@modules/feedbacks/domain/types/status.type';

export class FeedbackResponseDto {
  category: Category;
  comments: number;
  createdAt: Date;
  description: string;
  id: string;
  status: Status;
  title: string;
  upvotes: number;

  public static fromEntity(feedback: Feedback): FeedbackResponseDto {
    const response = new FeedbackResponseDto();
    response.createdAt = feedback.createdAt;
    response.description = feedback.description;
    response.id = feedback.id;
    response.title = feedback.title;
    response.status = feedback.status;
    response.category = feedback.category;
    response.upvotes = 0; // TODO: implement
    response.comments = 0; // TODO: implement

    return response;
  }
}
