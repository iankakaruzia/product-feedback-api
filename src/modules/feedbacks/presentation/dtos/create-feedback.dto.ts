import {
  Categories,
  Category,
} from '@modules/feedbacks/domain/types/category.type';
import { IsIn, IsNotEmpty, MinLength } from 'class-validator';

export class CreateFeedbackDto {
  @IsIn(Object.values(Categories))
  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  @MinLength(3)
  description: string;

  @IsNotEmpty()
  @MinLength(3)
  title: string;
}
