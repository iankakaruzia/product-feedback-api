export class DeleteProductCommand {
  constructor(
    public ownerId: string,
    public productId: string,
  ) {}
}
