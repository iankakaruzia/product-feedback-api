import { Entity } from '@common/domain/entities/entity';
import { Types } from 'mongoose';

export class User extends Entity {
  email: string;
  name: string;
  password: string;

  public static create(email: string, name: string, password: string): User {
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;
    user.id = new Types.ObjectId().toHexString();
    user.createdAt = new Date();

    return user;
  }

  public static update(
    user: User,
    email: string,
    name: string,
    password: string,
  ): User {
    user.email = email;
    user.name = name;
    user.password = password;
    user.updatedAt = new Date();

    return user;
  }
}
