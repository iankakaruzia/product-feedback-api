export class UpdateProductCommand {
  constructor(
    public readonly ownerId: string,
    public readonly productId: string,
    public readonly title?: string,
    public readonly description?: string,
  ) {}
}
