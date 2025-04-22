import { Product } from '@modules/products/domain/entities/product.entity';

export class ProductResponseDto {
  createdAt: Date;
  description: string;
  id: string;
  title: string;

  public static fromEntity(product: Product): ProductResponseDto {
    return {
      createdAt: product.createdAt,
      description: product.description,
      id: product.id,
      title: product.title,
    };
  }
}
