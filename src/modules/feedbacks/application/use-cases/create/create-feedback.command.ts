import { Category } from '@modules/feedbacks/domain/types/category.type';

export class CreateFeedbackCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly category: Category,
    public readonly productId: string,
    public readonly ownerId: string,
  ) {}
}
