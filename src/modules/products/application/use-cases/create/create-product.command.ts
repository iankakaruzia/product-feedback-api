export class CreateProductCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly ownerId: string,
  ) {}
}
