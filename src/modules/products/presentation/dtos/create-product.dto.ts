import { Optional } from '@nestjs/common';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  @Optional()
  description: string;

  @IsNotEmpty()
  @MinLength(3)
  title: string;
}
