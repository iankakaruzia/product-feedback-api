import { User as UserEntity } from '@modules/user/domain/entities/user.entity';

import { User } from '../schemas/user.schema';

export class UserMappings {
  public static toDomain(user: User): UserEntity {
    const userDomain = new UserEntity();

    userDomain.email = user.email;
    userDomain.id = user.id;
    userDomain.name = user.name;
    userDomain.password = user.password;
    userDomain.createdAt = user.createdAt;
    userDomain.updatedAt = user.updatedAt;

    return userDomain;
  }
}
