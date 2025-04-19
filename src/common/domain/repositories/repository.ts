export abstract class Repository<TEntity> {
  abstract create(entity: TEntity): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<null | TEntity>;
  abstract update(entity: TEntity): Promise<void>;
}
