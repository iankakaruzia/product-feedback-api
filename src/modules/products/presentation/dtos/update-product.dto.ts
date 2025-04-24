import { IsOptional, MinLength } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @MinLength(3)
  description?: string;

  @IsOptional()
  @MinLength(3)
  title?: string;
}
