import { Types } from 'mongoose';

export class MongoMappings {
  public static toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId.createFromHexString(id);
  }

  public static toString(id: number): string {
    return id.toString();
  }
}
