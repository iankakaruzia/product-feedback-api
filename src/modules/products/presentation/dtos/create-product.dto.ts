import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsOptional()
  @MinLength(3)
  description: string;

  @IsNotEmpty()
  @MinLength(3)
  title: string;
}
