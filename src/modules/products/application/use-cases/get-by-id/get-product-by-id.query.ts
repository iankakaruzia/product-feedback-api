export class GetProductByIdQuery {
  constructor(
    public ownerId: string,
    public productId: string,
  ) {}
}
